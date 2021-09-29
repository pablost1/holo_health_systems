const express = require('express');
const router = express.Router()
const pool = require('../mysql').pool
const bcrypt = require('bcrypt')


router.post('/cadastro',(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        console.log(1)
        conn.query(
            'SELECT * FROM Usuario WHERE cpf = ?',
            [req.body.cpf],
            (error,results,fields)=>{
                console.log(2)
                if(error){return res.status(500).send({error:error})}
                if(results>0){return res.status(409).send({mensagem: "cpf já cadastrado"})}
                conn.query(
                    'SELECT * FROM Usuario WHERE email = ?',
                    [req.body.email],
                    (error,result,field)=>{
                        console.log(3)
                        if(error){return res.status(500).send({error:error})}
                        if(result>0){return res.status(409).send({mensagem: "email já cadastrado"})}
                        bcrypt.hash(req.body.senha,10,(errorBcrypt,hash)=>{
                            console.log(4)
                            if(errorBcrypt){return res.status(500).send({error:errorBcrypt})}
                            console.log(5)
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
                                    console.log(6)
                                    if(error){return res.status(500).send({error:error})}
                                    console.log(7)
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