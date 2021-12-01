const express = require('express');
const router = express.Router()
const pool = require('../mysql').pool
const login_paciente = require('../middleware/login_paciente')

router.post("/marcar_consulta",login_paciente,(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err){return res.status(500).send({error:err})}
        conn.query("SELECT * FROM reserva WHERE id_reserva=?",[req.body.id_reserva],(err,results)=>{
            if(err){return res.status(500).send({error:err})}
            if(results.length==0){return res.status(404).send({mensagem: "Reserva não encontrada"})}
            if(req.body.hor_marc>results[0].hor_fin || req.body.hor_marc<results[0].hor_ini){return res.status(409).send({mensagem: "horário invalido"})}
            conn.query("SELECT * FROM consulta WHERE id_reserva=? and hor_marc=?",[req.body.id_reserva,req.body.hor_marc],(err,result)=>{
                if(err){return res.status(500).send({error:err})}
                if(result.length!=0){return res.status(409).send({mensagem:"horário ocupado"})}
                conn.query("SELECT * FROM consulta WHERE cpf_paciente=? and hor_marc=? and status=0",[req.usuario.cpf,req.body.hor_marc],(err,result)=>{
                    if(err){return res.status(500).send({error:err})}
                    if(results.length!=0){return res.status(409).send({mensagem:"Paciente já tem consulta nesse horário"})}
                    conn.query("INSERT INTO consulta (cpf_paciente,id_medico,id_reserva,hor_marc,status) VALUES (?,?,?,?,0)",[req.usuario.cpf,results[0].id_medico,req.body.id_reserva,req.body.hor_marc],(err,result)=>{
                        if(err){return res.status(500).send({error:err})}
                        return res.status(201).send({mensagem:"consulta criada com sucesso"})
                    })
                })
            })
        })
    })
})
router.get("/minhas_consultas",login_paciente,(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err){return res.status(500).send({error:err})}
        conn.query("SELECT * FROM consulta INNER JOIN reserva ON consulta.id_reserva=reserva.id_reserva WHERE cpf_paciente=? AND status=0",[req.usuario.cpf],(err,results)=>{
            if(err){return res.status(500).send({error: err})}
            const response = {
                Consultas: results.map(consulta => {
                    return {
                        id_consulta: consulta.id_consulta,
                        cpf_paciente: consulta.cpf_paciente,
                        id_medico: consulta.id_medico,
                        id_reserva: consulta.id_reserva,
                        data: consulta.data,
                        id_sala: consulta.id_sala,
                        hor_marc: consulta.hor_marc,
                        status: consulta.status
                    }
                })
            }
            return res.status(200).send(response)
        })
    })
})

router.get("/proxima_consulta",login_paciente,(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err){return res.status(500).send({error:err})}
        conn.query("SELECT * FROM consulta INNER JOIN reserva ON consulta.id_reserva=reserva.id_reserva WHERE cpf_paciente=? AND status=0 ORDER BY data ASC, hor_marc ASC",[req.usuario.cpf],(err,results)=>{
            if(err){return res.status(500).send({error: err})}
            const response = {
                Consultas: results.map(consulta => {
                    return {
                        id_consulta: consulta.id_consulta,
                        cpf_paciente: consulta.cpf_paciente,
                        id_medico: consulta.id_medico,
                        id_reserva: consulta.id_reserva,
                        data: consulta.data,
                        id_sala: consulta.id_sala,
                        hor_marc: consulta.hor_marc,
                        status: consulta.status
                    }
                })[0]
            }
            return res.status(200).send(response)
        })
    })
})

module.exports=router