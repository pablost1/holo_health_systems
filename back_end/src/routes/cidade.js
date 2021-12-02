const express = require('express');
const router = express.Router();
const pool = require("../mysql").pool;

const paci_op = require('../middleware/login_paciente_op') 
const gerente = require('../middleware/login_gerente')
const mestre  = require('../middleware/login_mestre')
const usuario = require('../middleware/login_usuario')

/** Retorna todas as cidades cadastradas */
router.get('/',usuario,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query('SELECT * FROM cidade',(error,results,field)=>{
            if(error){return res.status(500).send({error:error})}
            const response = {
                cidades: results.map(cidade =>{
                    return {
                        id_cidade: cidade.id_cidade,
                        id_estado: cidade.id_estado,
                        nome: cidade.nome
                    }
                })
            }
            return res.status(200).send(response)
        })
    })
})

/**
 * Cadastra uma cidade
 * 
 *  Formato da requisição
 * {
 *      "nome"             : String,   // Nome do estado.
 *      "id_estado"        : Integer   // Numero identificador do estado. 
 * }
 */
router.post('/',mestre,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'SELECT * FROM estado WHERE id_estado = ?',
            [req.body.id_estado],
            (error,results,fields)=>{
                if(error){return res.status(500).send({error:error})}
                if(results.length == 0){return res.status(404).send({mensagem: "estado não encontrado"})}
                conn.query(
                    'SELECT * FROM cidade WHERE nome = ?',
                    [req.body.nome],
                    (error,result, field)=>{
                        if(error){return res.status(500).send({error:error})}
                        if(result.length!=0){return res.status(409).send({mensagem:"cidade já cadastrada"})}
                        conn.query(
                            'INSERT INTO cidade (nome,id_estado) VALUES (?,?)',
                            [req.body.nome,req.body.id_estado],
                            (error,result,field)=>{
                                if(error){return res.status(500).send({error:error})}
                                const response = {
                                    mensagem:"cidade criada com sucesso",
                                    cidadeCriada:{
                                        id_cidade: result.insertId,
                                        nome: req.body.nome,
                                        id_estado: req.body.id_estado
                                    }
                                }
                                return res.status(201).send(response)
                            }
                        )
                    }
                )
            }
            )
    })
})

/**
 * Atualiza uma cidade
 * 
 *  Formato da requisição
 * {
 *      "nome"             : String,   // Nome do estado.
 *      "id_estado"        : Integer   // Numero identificador do estado. 
 *      "id_cidade"        : Integer   // Numero identificador da cidade. 
 * }
 */
router.patch('/',mestre,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query('SELECT * FROM cidade WHERE id_cidade = ?', [req.body.id_cidade],(error,results,fields)=>{
                
            if(error){return res.status(500).send({error:error})}
            if(results.length==0){return res.status(404).send({mensagem:"cidade não encontrada"})}
            conn.query('SELECT * FROM cidade WHERE nome = ?',[req.body.nome],(error,result,field)=>{
                if(error){return res.status(500).send({error:error})}
                if(result.length>0){return res.status(409).send({mensagem:"cidade já cadastrada"})}
                conn.query('UPDATE cidade SET nome = ? WHERE id_cidade = ?',[req.body.nome, req.body.id_cidade, req.body.id_estado],(error,resul,fiel)=>{
                    conn.release()
                    if(error){return res.status(500).send({error:error})}
                    const response = {
                        mensagem:"cidade alterada com sucesso",
                        estadoGerado: {
                            id_cidade: req.body.id_cidade,
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
 * Deleta uma cidade
 * 
 *  Formato da requisição
 * {
 *      "id_cidade"        : Integer   // Numero identificador da cidade. 
 * }
 */
router.delete('/',gerente,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'DELETE FROM cidade WHERE id_cidade = ?',
            [req.body.id_cidade],
            (error,result,field)=>{
                if(error){return res.status(500).send({error:error})}
                return res.status(202).send({mensagem:"removido com sucesso"})
            }
        )
    })
})
module.exports = router