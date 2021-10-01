const express = require('express');
const router = express.Router();
const pool = require("../mysql").pool;

const paci_op = require('../middleware/login_paciente_op') 
const gerente = require('../middleware/login_gerente')

router.get("/",paci_op,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query('SELECT * FROM estado;',(error,results,fields)=>{
            conn.release()
            if(error){return res.status(500).send({error:error})}
            const response = {
                estados: results.map(estado =>{
                    return {
                        id_estado: estado.id_estado,
                        nome:estado.nome
                    }
                })
            }
            
            return res.status(200).send(response)
        })
    })
})

router.post('/',gerente,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'SELECT * FROM estado WHERE nome = ?',
            [req.body.nome],
            (error,results,fields)=>{
                if(error){return res.status(500).send({error:error})}
                if(results.length>0){return res.status(409).send({mensagem:"estado já cadastrado"})}
                conn.query(
                    'INSERT INTO estado (nome) VALUES (?)',
                    [req.body.nome],
                    (error,result,field)=>{
                        if(error){return res.status(500).send({error:error})}
                        const response = {
                            id_estado: result.insertId,
                            nome: req.body.nome
                        }
                        return res.status(201).send(response)
                    }
                )
            }
        )
    })
})

module.exports = router