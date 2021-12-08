const express = require('express');
const router = express.Router()
const pool = require('../mysql').pool
const login_gerente = require('../middleware/login_gerente')
const login_usuario = require('../middleware/login_usuario')
router.get('/reservas',login_usuario,(req,res)=>{
    pool.getConnection((err,conn)=>{

        if(err){return res.status(500).send({error:err})}
        conn.query("SELECT *  FROM reserva INNER JOIN sala ON reserva.id_sala = sala.id_sala where id_consultorio=?",[req.usuario.id_consultorio],(err,results)=>{
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