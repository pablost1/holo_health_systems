const express = require('express');
const router = express.Router();
const pool = require("../mysql").pool;

const paci_op = require('../middleware/login_paciente_op') 
const gerente = require('../middleware/login_gerente')

/**
 * Consulta todos os consultórios existentes
 * 
 */
router.get('/',paci_op,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query('SELECT * FROM Consultorio',(error,results,field)=>{
            if(error){return res.status(500).send({error:error})}
            const response = {
                Consultorios: results.map(consultorio =>{
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
 *      "id_cidade"        : Integer   // Numero identificador da cidade. 
 * }
 */
router.post('/',gerente,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'SELECT * FROM Cidade WHERE id_cidade = ?',
            [req.body.id_cidade],
            (error,results,fields)=>{
                if(error){return res.status(500).send({error:error})}
                if(results.length == 0){return res.status(404).send({mensagem: "Cidade não encontrado"})}
                conn.query(
                    'SELECT * FROM Consultorio WHERE nome = ?',
                    [req.body.nome],
                    (error,result, field)=>{
                        if(error){return res.status(500).send({error:error})}
                        if(result.length!=0){return res.status(409).send({mensagem:"Consultorio já cadastrado"})}
                        conn.query(
                            'INSERT INTO Consultorio (nome,id_cidade) VALUES (?,?)',
                            [req.body.nome,req.body.id_cidade],
                            (error,resul,fiel)=>{
                                if(error){return res.status(500).send({error:error})}
                                const response = {
                                    mensagem:"Consultorio criado com sucesso",
                                    consultorioCriado:{
                                        id_consultorio: resul.insertId,
                                        nome: req.body.nome,
                                        id_cidade: req.body.id_cidade
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
 *  Atualiza um consultório
 * 
 *  Formato da requisição
 * {
 *      "nome"                  : String,   // Nome do consultório.
 *      "id_consultório"        : Integer   // Numero identificador do consultório. 
 * }
 */
router.patch('/',gerente,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query('SELECT * FROM Consultorio WHERE id_consultorio = ?', [req.body.id_consultorio],(error,results,fields)=>{  
            if(error){return res.status(500).send({error:error})}
            if(results.length==0){return res.status(404).send({mensagem:"Consultorio não encontrado"})}
            conn.query('SELECT * FROM Consultorio WHERE nome = ?',[req.body.nome],(error,result,field)=>{
                if(error){return res.status(500).send({error:error})}
                if(result.length>0){return res.status(409).send({mensagem:"Consultorio já cadastrado"})}
                conn.query('UPDATE Consultorio SET nome = ? WHERE id_consultorio = ?',[req.body.nome,req.body.id_consultorio],(error,resul,fiel)=>{
                    conn.release()
                    if(error){return res.status(500).send({error:error})}
                    const response = {
                        mensagem:"Consultorio alterado com sucesso",
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
router.delete('/',gerente,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'DELETE FROM Consultorio WHERE id_consultorio = ?',
            [req.body.id_consultorio],
            (error,result,field)=>{
                if(error){return res.status(500).send({error:error})}
                return res.status(202).send({mensagem:"removido com sucesso"})
            }
        )
    })
})

module.exports = router