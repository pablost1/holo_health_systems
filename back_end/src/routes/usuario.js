const express = require('express');
const router = express.Router()
const pool = require('../mysql').pool
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cadastro_medico = require('../middleware/cadastro_medico');


router.post('/cadastro',cadastro_medico,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'SELECT * FROM Usuario WHERE cpf = ?',
            [req.body.cpf],
            (error,results,fields)=>{
                if(error){return res.status(500).send({error:error})}
                if(results.length>0){return res.status(409).send({mensagem: "cpf já cadastrado"})}
                conn.query(
                    'SELECT * FROM Usuario WHERE email = ?',
                    [req.body.email],
                    (error,result,field)=>{
                        if(error){return res.status(500).send({error:error})}
                        if(result.length>0){return res.status(409).send({mensagem: "email já cadastrado"})}
                        bcrypt.hash(req.body.senha,10,(errorBcrypt,hash)=>{
                            if(errorBcrypt){return res.status(500).send({error:errorBcrypt})}
                            conn.query(
                                'INSERT INTO Usuario (cpf,email,nome,sobrenome,tipo,senha) VALUES (?,?,?,?,?,?)',
                                [
                                    req.body.cpf,
                                    req.body.email,
                                    req.body.nome,
                                    req.body.sobrenome,
                                    req.body.tipo,
                                    hash
                                ],
                                (error,resul,fiel)=>{
                                    conn.release()
                                    if(error){return res.status(500).send({error:error})}
                                    const response = {
                                        mensagem: "usuário criado com sucesso",
                                        usuarioCriado: {
                                            id_usuario: resul.insertId,
                                            cpf: req.body.cpf,
                                            email: req.body.email
                                            
                                        }
                                    }
                                    return res.status(201).send(response)
                                }
                            )
                        })
                    }
                )
            }
        )
    })
})

router.post('/login',(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        const sql_query = req.body.cpf ? "SELECT * FROM Usuario WHERE cpf = ?" : "SELECT * FROM Usuario WHERE email = ?"
        conn.query(
            sql_query,
            [(req.body.cpf ? req.body.cpf : req.body.email)],
            (error,results,fields)=>{
                if(error){return res.status(500).send({error:error})}
                if(results.length<1){return res.status(401).send({mensagem: "falha na autenticação"})}
                bcrypt.compare(req.body.senha,results[0].senha,(err,result)=>{
                    if(err){return res.status(401).send({mensagem: "falha na autenticação"})}

                    if(result){
                        var key;
                        console.log(results[0].tipo)
                        switch(results[0].tipo){
                            case "G":
                                key = process.env.GERENTE_JWT_KEY;
                                break;
                            case "M":
                                key = process.env.MEDICO_JWT_KEY;
                                break;
                            default:
                                key = process.env.PACIENTE_JWT_KEY;
                        }
                        const token =  jwt.sign(
                            {
                                id_usuario: results[0].id_usuario,
                                cpf: results[0].cpf,
                                email: results[0].email
                            },
                            key,
                            {
                                expiresIn:"1h"
                            })
                            return res.status(200).send({
                                mensagem: "autenticado com sucesso",
                                token: token
                            })

                    }
                    return res.status(401).send({mensagem: "falha na autenticação"})
                })
            })
    })
})

module.exports = router