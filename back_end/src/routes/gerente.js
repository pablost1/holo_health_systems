const express = require('express');
const router = express.Router()
const pool = require('../mysql').pool
const login_gerente = require('../middleware/login_gerente')
const login_usuario = require('../middleware/login_usuario')

router.post('/reservas_especificas',login_usuario,(req,res)=>{
    pool.getConnection((err,conn)=>{

        if(!req.body.id_sala){return res.status(406).send({mensagem:"É necessário a sala"})}
        console.log(req.body.id_sala)
        if(err){return res.status(500).send({error:err})}
        conn.query("SELECT * FROM reserva WHERE id_sala = ?",
        [req.body.id_sala],
        (err,results,fields)=>{
            console.log(req.body.id_sala)
            console.log(results)
            if(err){return res.status(500).send({error:err})}
            const response = {
                reservas: results.map(reserva =>{
                    return {
                        id_reserva: reserva.id_reserva,
                        data: reserva.data,
                        hor_ini: reserva.hor_ini,
                        hor_fin: reserva.hor_fin,
                        id_sala: reserva.id_sala,
                        id_medico: reserva.id_medico
                    }
                })
            }
            return res.status(200).send(response)
        })
    })
})
router.get("/medicos_consultorio",login_gerente,(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err){return res.status(500).send({error:err})}
        conn.query("SELECT medico.crm, medico_consultorio.id_consultorio, especialidade.id_especialidade, usuario.nome as nome_medico, usuario.sobrenome, especialidade.nome as especialidade FROM medico_consultorio INNER JOIN medico ON medico_consultorio.id_medico = medico.crm  INNER JOIN usuario ON medico.cpf_medico = usuario.cpf INNER JOIN especialidade ON medico.especialidade=especialidade.id_especialidade WHERE medico_consultorio.id_consultorio=?",[req.usuario.id_consultorio],(err,results)=>{
            if(err){return res.status(500).send({error:err})}
            const response = {
                medicos: results.map(medico => {
                return {
                    crm: medico.crm,
                    nome: medico.nome_medico,
                    sobrenome: medico.sobrenome,
                    especialidade: medico.nome,
                    id_especialidade: medico.id_especialidade,
                    id_consultorio: medico.id_consultorio
                    
                }
            })
        }
            return res.status(200).send(response)
        })
    })
})
router.post('/especialidades_medico',login_gerente,(req,res)=>{
    if(!req.body.id_medico){return res.status(406).send({mensagem:"É necessário o médico"})}
    pool.getConnection((err,conn)=>{
        if(err){return res.status(500).send({error:err})}
        conn.query(`
        SELECT 
            medico.geral, especialidade.nome 
        FROM 
            medico 
        INNER JOIN 
            especialidade 
        ON 
            medico.especialidade = especialidade.id_especialidade  
        WHERE 
            crm=?
        `,
        [req.body.id_medico],
        (err,results)=>{
            if(err){return res.status(500).send({error:err})}
            const response = {
                especialidade: results[0].geral? [results[0].nome,"Clinico geral"] : [results[0].nome]
            }
            return res.status(200).send(response)
        })
    })
})


router.post('/horarios_reserva',login_usuario,(req,res)=>{
    if(!req.body.id_reserva){return res.status(406).send({mensagem:"É necessário a reserva"})}
    pool.getConnection((err,conn)=>{
        if(err){return res.status(500).send({error:err})}
        conn.query("SELECT * FROM reserva WHERE id_reserva=?",[req.body.id_reserva],(err,results)=>{
            if(err){return res.status(500).send({error:err})}
            if(results.length==0){return res.status(404).send({mensagem:"reserva não encontrada"})}
            const horaInicio = results[0].hor_ini.split(":").map(x =>{return parseInt(x)})
            const horaFim = results[0].hor_fin.split(":").map(x =>{return parseInt(x)})
            horarios = []
            for(;horaInicio[0]<=horaFim[0];horaInicio[0]++){
                for(;horaInicio[1]<(horaInicio[0]==horaFim[0] ? horaFim[1] : 59);horaInicio[1]+=10){
                    
                    let horaFormatada = (horaInicio[0].toString().length==1? ('0'+horaInicio[0].toString()) : horaInicio[0].toString())+":"+(horaInicio[1].toString().length==1? ('0'+horaInicio[1].toString()) : horaInicio[1].toString())+":00"
                    horarios.push(horaFormatada)
                }
                horaInicio[1]=0
                }
            
            conn.query("SELECT * FROM consulta WHERE id_reserva=?",[req.body.id_reserva],(err,results)=>{
                if(err){return res.status(500).send({error:err})}
                horariosMarcados = results.map(consulta => consulta.hor_marc)
                horarios = horarios.map(horario => (horariosMarcados.includes(horario)? [horario,1]: [horario,0]))
                return res.status(200).send({Horarios: horarios})
            })
        })
    })
})

router.post('/nova_reserva',login_gerente,(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err){return res.status(500).send({error:err})}
        if(!req.body.data){return res.status(406).send({mensagem: "É necessário a data."})}
        if(!req.body.hor_ini){return res.status(406).send({mensagem: "É necessário a hora inicial."})}
        if(!req.body.hor_fin){return res.status(406).send({mensagem: "É necessário a hora final."})}
        if(!req.body.id_sala){return res.status(406).send({mensagem: "É necessário a sala."})}
        if(!req.body.id_medico){return res.status(406).send({mensagem: "É necessário o médico."})}
        conn.query("SELECT * FROM sala WHERE id_sala=?",[req.body.id_sala],(err,results)=>{
            if(err){return res.status(500).send({error:err})}
            if(results.length==0){return res.status(404).send({mensagem:"sala não encontrada"})}
            if(results[0].id_consultorio!=req.usuario.id_consultorio){return res.status(401).send({mensagem:"você não possui acesso a esse consultório"})}
            conn.query("SELECT * FROM reserva WHERE data=? AND ((? BETWEEN hor_ini AND hor_fin) OR (? BETWEEN hor_ini AND hor_fin) OR (hor_ini BETWEEN ? AND ?)) AND id_sala=?",[req.body.data,req.body.hor_ini,req.body.hor_fin,req.body.hor_ini,req.body.hor_fin,req.body.id_sala],(err,results)=>{
                if(err){return res.status(500).send({error:err})}
                if(results!=0){return res.status(409).send({mensagem: "sala ocupada neste horário"})}
                conn.query("SELECT * FROM medico_consultorio WHERE id_medico=? AND id_consultorio",[req.body.id_medico,req.usuario.id_consultorio],(err,results)=>{
                    if(err){return res.status(500).send({error:err})}
                    if(results.length==0){return res.status(404).send({mensagem:"medico não cadastrado nesse consultório"})}
                    conn.query("SELECT * FROM reserva WHERE data=? AND ((? BETWEEN hor_ini AND hor_fin) OR (? BETWEEN hor_ini AND hor_fin) OR (hor_ini BETWEEN ? AND ?)) AND id_medico=?",[req.body.data,req.body.hor_ini,req.body.hor_fin,req.body.hor_ini,req.body.hor_fin,req.body.id_medico],(err,results)=>{
                        if(err){return res.status(500).send({error:err})}
                        if(results.length!=0){return res.status(409).send({mensagem: "médico indisponível neste horário"})}
                        conn.query(
                            "INSERT INTO reserva (data,hor_ini,hor_fin,id_sala,id_medico) VALUES (?,?,?,?,?)",
                            [req.body.data,req.body.hor_ini,req.body.hor_fin,req.body.id_sala,req.body.id_medico],
                            (err,results)=>{
                                if(err){return res.status(500).send({error:err})}
                                return res.status(201).send({mensagem:"reserva criada com sucesso"})
                            }
                            
                            )
                    })
                })
                
            }) 
        })                                                                                                                                                                                                      
    })
})

router.delete("/deletar_reserva",login_gerente,(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err){return res.status(500).send({error:err})}
        conn.query("SELECT *  FROM reserva INNER JOIN sala ON reserva.id_sala = sala.id_sala WHERE id_reserva=?",[req.body.id_reserva],(err,results)=>{
            if(err){return res.status(500).send({error:err})}
            if(results.length==0){return res.status(404).send({mensagem:"reserva não encontrada"})}
            if(results[0].id_consultorio!=req.usuario.id_consultorio){return res.status(401).send({mensagem: "você não pode cancelar uma reserva que não é do seu consultório"})}
            conn.query("DELETE FROM reserva WHERE id_reserva=?",[req.body.id_reserva],(err,results)=>{
                if(err){return res.status(500).send({error:err})}
                return res.status(202).send({mensagem:"reserva excluida com sucesso"})
            })
        })
    })
})

module.exports =router