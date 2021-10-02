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

router.patch('/',gerente,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query('SELECT * FROM estado WHERE id_estado = ?',[req.body.id_estado],(error,results,fields)=>{
            if(error){return res.status(500).send({error:error})}
            if(results.length == 0){return res.status(404).send({mensagem: "estado não encontrado"})}
            conn.query('SELECT * FROM estado WHERE nome = ?',[req.body.nome],(error,result,field)=>{
                if(error){return res.status(500).send({error:error})}
                if(result.length>0){return res.status(409).send({mensagem:"estado já cadastrado"})}
                conn.query('UPDATE estado SET nome = ? WHERE id_estado = ?',[req.body.nome,req.body.id_estado],(error,resul,fiel)=>{
                    conn.release()
                    if(error){return res.status(500).send({error:error})}
                    const response = {
                        mensagem:"estado alterado com sucesso",
                        estadoGerado: {
                            id_estado: req.body.id_estado,
                            nome: req.body.nome
                        }
                    
                    }
                    return res.status(202).send(response)
                })
            })
        })
    })
})

router.delete('/',gerente,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'DELETE FROM estado WHERE id_estado = ?',
            [req.body.id_estado],
            (error,result,field)=>{
                if(error){return res.status(500).send({error:error})}
                return res.status(202).send({mensagem:"removido com sucesso"})
            }
        )
    })
})
module.exports = router