const express = require('express');
const router = express.Router();
const pool = require("../mysql").pool;
const login_medico = require('../middleware/login_medico');

router.post("/novo_consultorio",login_medico,(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err){return res.status(500).send({error: err})}
        conn.query("SELECT * FROM consultorio WHERE id_consultorio=?",[req.body.id_consultorio],(err,results)=>{
            if(err){return res.status(500).send({error: err})}
            if(results.length==0){return res.status(404).send({mensagem: "Consultório não encontrado"})}
            conn.query("SELECT * FROM medico_consultorio WHERE id_medico=? AND id_consultorio=?",[req.usuario.crm,req.body.id_consultorio],(err,results)=>{
                if(err){return res.status(500).send({error: err})}
                if(results.length!=0){return res.status(409).send({mensagem: "medico já está cadastrado neste consultório"})}
                conn.query("INSERT INTO medico_consultorio (id_medico,id_consultorio) VALUES (?,?)",[req.usuario.crm,req.body.id_consultorio],(err,results)=>{
                    if(err){return res.status(500).send({error: err})}
                    return res.status(201).send({mensagem:"médico registrado no consultório"})
                })
            })
        })
    })
})

module.exports = router