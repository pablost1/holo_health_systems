const express = require('express');
const router = express.Router()
const pool = require('../mysql').pool
const bcrypt = require('bcrypt')


router.post('/cadastro',(req,res,next)=>{
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

module.exports = router