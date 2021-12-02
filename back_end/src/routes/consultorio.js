const express = require('express');
const router = express.Router();
const pool = require("../mysql").pool;

const paci_op = require('../middleware/login_paciente_op') 
const gerente = require('../middleware/login_gerente')
const mestre  = require('../middleware/login_mestre')
const usuario = require('../middleware/login_usuario')

/**
 * Consulta todos os consultórios existentes
 * 
 */
router.get('/',usuario,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query('SELECT * FROM consultorio',(error,results,field)=>{
            if(error){return res.status(500).send({error:error})}
            const response = {
                consultorios: results.map(consultorio =>{
                    return {
                        id_consultorio: consultorio.id_consultorio,
                        id_cidade: consultorio.id_cidade,
                        nome: consultorio.nome

                    }
                })
            }
            return res.status(200).send(response)
        })
    })
})

/**
 *  Cadastra um consultório.
 * 
 *  Formato da requisição
 * {
 *      "nome"             : String,   // Nome do consultório.
 *      "id_cidade"        : Integer,  // Numero identificador da cidade.
 *      "bairro"           : String,   // Nome do bairro
 *      "rua"              : String    // Nome da rua
 *      "numero"           : String,   // Numero identificador do estabelecimento
 *       
 * }
 */
router.post('/',mestre,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'SELECT * FROM cidade WHERE id_cidade = ?',
            [req.body.id_cidade],
            (error,results,fields)=>{
                if(error){return res.status(500).send({error:error})}
                if(results.length == 0){return res.status(404).send({mensagem: "Cidade não encontrado"})}
                conn.query(
                    'SELECT * FROM endereço WHERE bairro = ? AND rua = ? AND numero = ? AND id_cidade = ? ',
                    [
                        req.body.bairro,
                        req.body.rua,
                        req.body.numero,
                        req.body.id_cidade
                    ],
                    (error, result, field)=>{
                        if(error){return res.status(500).send({error:error})}
                        if(result.length!=0){return res.status(409).send({mensagem:"Endereço já cadastrado"})}
                        conn.query(
                            'INSERT INTO endereço (id_cidade, bairro, rua, numero) VALUES (?,?,?,?)',
                            [
                                req.body.id_cidade,
                                req.body.bairro,
                                req.body.rua,
                                req.body.numero
                            ],
                            (error,result,field)=>{
                                if(error){return res.status(500).send({error:error})}
                                enderecoID = result.insertId
                                conn.query(
                                    'SELECT * FROM consultorio WHERE id_endereco = ?',
                                    [result.insertId],
                                    (error,result,field)=>{
                                        if(error){return res.status(500).send({error:error})}
                                        if(result.length!=0){return res.status(409).send({mensagem:"Um consultório já cadastrado neste endereço"})}
                                        conn.query(
                                            'INSERT INTO consultorio (nome, id_endereco) VALUES (?,?)',
                                            [
                                                req.body.nome,
                                                enderecoID
                                            ],
                                            (error, result, field)=>{
                                                if(error){return res.status(500).send({error:error})}
                                                const response = {
                                                    mensagem:"Consultório cadastrado com sucesso!",
                                                    consultorioCriado:{
                                                        nome: req.body.nome,
                                                        consultorio: result.id_consultorio,
                                                        endereço: result.id_endereco
                                                    }
                                                }
                                                return res.status(201).send(response)
                                            }
                                        )
                                    }
                                )
                            }
                        )
                    }
                )
            }
        )
    })
})

/**
 *  Atualiza um consultório
 * 
 *  Formato da requisição
 * {
 *      "nome"                  : String,   // Nome do consultório.
 *      "id_consultório"        : Integer   // Numero identificador do consultório. 
 * }
 */
router.patch('/',mestre,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query('SELECT * FROM consultorio WHERE id_consultorio = ?', [req.body.id_consultorio],(error,results,fields)=>{  
            if(error){return res.status(500).send({error:error})}
            if(results.length==0){return res.status(404).send({mensagem:"consultorio não encontrado"})}
            conn.query('SELECT * FROM consultorio WHERE nome = ?',[req.body.nome],(error,result,field)=>{
                if(error){return res.status(500).send({error:error})}
                if(result.length>0){return res.status(409).send({mensagem:"consultorio já cadastrado"})}
                conn.query('UPDATE consultorio SET nome = ? WHERE id_consultorio = ?',[req.body.nome,req.body.id_consultorio],(error,resul,fiel)=>{
                    conn.release()
                    if(error){return res.status(500).send({error:error})}
                    const response = {
                        mensagem:"consultorio alterado com sucesso",
                        estadoGerado: {
                            id_consultorio: req.body.id_consultorio,
                            nome: req.body.nome
                        }
                    
                    }
                    return res.status(202).send(response)
                })
            })
        })
    })
})

/**
 * Deleta um consultório
 * 
 *  Formato da requisição
 * {
 *      "id_consultorio"        : Integer   // Numero identificador do consultorio. 
 * }
 */
router.delete('/',mestre,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'DELETE FROM consultorio WHERE id_consultorio = ?',
            [req.body.id_consultorio],
            (error,result,field)=>{
                if(error){return res.status(500).send({error:error})}
                return res.status(202).send({mensagem:"removido com sucesso"})
            }
        )
    })
})

module.exports = router