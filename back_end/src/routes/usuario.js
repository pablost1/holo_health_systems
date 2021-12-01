const express = require('express');
const router = express.Router()
const pool = require('../mysql').pool
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cadastro_medico = require('../middleware/cadastro_medico');

 /**
 * Rota para cadastro dos usuários
 * 
 * Formato da requisição
 * {
 *      "cpf"              : Integer,  // Numero do CPF do novo usuário
 *      "senha"            : String,   // Senha do usuario
 *      "email"            : String,   // E-mail de cadastro do novo usuario
 *      "nome"             : String,   // Nome principal do usuario
 *      "sobrenome"        : String,   // Ultimo nome do usuario
 *      "tipo"             : String,   // Tipo de usuario cadastrado: Paciente = P, Médico = M, Gerente = G
 *      "especialidade"    : Int       // numero identificador da especialidade do médico, [APENAS PARA MÉDICOS]
 * }
 */
router.post('/cadastro',cadastro_medico,(req,res,next)=>{
    if (req.body.tipo == "M" && !(req.body.especialidade)) { return res.status(500).send({error:"Insira a especialidade para cadastrar o médico"})}
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
                        const saltRounds = 5
                        bcrypt.genSalt(saltRounds, function(err, salt){
                            bcrypt.hash(req.body.senha, salt, (errorBcrypt,hash)=>{     
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
                                (error,result,field)=>{
                                    conn.release()
                                    if(req.body.tipo == "M"){
                                        conn.query(
                                            'INSERT INTO Especialidade_Medico (id_medico,id_especialidade) VALUES (?,?)',
                                            [
                                                result.insertId,
                                                req.body.especialidade
                                            ],
                                        )
                                    }
                                    if(error){return res.status(500).send({error:error})}
                                    const response = {
                                        mensagem: "Usuário criado com sucesso",
                                        usuarioCriado: {
                                            id_usuario: result.insertId,
                                            cpf: req.body.cpf,
                                            email: req.body.email
                                            
                                        }
                                    }
                                    return res.status(201).send(response)
                                }
                            )
                            })
                        })
                        
                    }
                )
            }
        )
    })
})

/** Rota para login
 * 
 *  Formato para requisição
 * {
 *      "login" : Integer/String // Numero do CPF / Endereço de e-mail
 *      "senha" : Integer        // Senha de acesso   
 * }
 */
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