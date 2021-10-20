const express = require('express');
const router = express.Router();
const pool = require("../mysql").pool;

const paci_op = require('../middleware/login_paciente_op') 
const gerente = require('../middleware/login_gerente')

/**
 * Retorna todos os identificadores de especialidade e consultório que estão relacionados.
 *
 */
router.get('/',paci_op,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query('SELECT * FROM Especialidade_Consultorio',(error,results,fields)=>{
            conn.release()
            if(error){return res.status(500).send({error:error})}
            const response = {
                especonsuls: results.map(especonsul => {
                    return {
                        id_Especialidade_Consultorio: especonsul.id_Especialidade_Consultorio,
                        id_consultorio: especonsul.id_consultorio,
                        id_especialidade: especonsul.id_especialidade
                    }
                })
            }
            return res.status(200).send(response)
        })
    })
})

/**
 * Associa uma especialidade a um consultório
 * 
 * Formato da requisição
 * {
 * 
 *      "id_consultorio"        : Integer,  // Numero identificador do consultório. 
 *      "id_especialidade"      : Integer,  // Numero identificador da especialidade. 
 * }
 */
router.post('/',gerente,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'SELECT * FROM Consultorio WHERE id_consultorio = ?',
            [req.body.id_consultorio],
            (error,results,fields)=>{
                if(error){return res.status(500).send({error:error})}
                if(results.length == 0 ){return res.status(404).send({mensagem: "consultorio não encontrado"})}
                conn.query(
                    'SELECT * FROM Especialidade WHERE id_especialidade = ?',
                    [req.body.id_especialidade],
                    (error,results,fields)=>{
                        if(error){return res.status(500).send({error:error})}
                        if(results.length == 0 ){return res.status(404).send({mensagem: "Especialidade não encontrada"})}
                        conn.query(
                            'SELECT * FROM Especialidade_Consultorio WHERE id_consultorio = ? AND id_especialidade = ?',
                            [req.body.id_consultorio,req.body.id_especialidade],
                            (error,results,fields)=>{
                                if(error){return res.status(500).send({error:error})}
                                if(results.length!= 0){return res.status(409).send({mensagem:"essa ligação especialidade/consultorio já foi cadastrada"})}
                                conn.query(
                                    'INSERT INTO Especialidade_Consultorio (id_consultorio,id_especialidade) VALUES (?,?)',
                                    [req.body.id_consultorio,req.body.id_especialidade],
                                    (error,results,fields)=>{
                                        conn.release()
                                        if(error){return res.status(500).send({error:error})}
                                        const response = {
                                            mensagem: "Especialidade_Consultorio criado com sucesso",
                                            especonsulCriado: {
                                                id_Especialidade_Consultorio: results.insertId,
                                                id_consultorio: req.body.id_consultorio,
                                                id_especialidade: req.body.id_especialidade
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
    })
})


module.exports = router