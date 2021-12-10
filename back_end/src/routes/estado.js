const express = require('express');
const router = express.Router();
const pool = require("../mysql").pool;

const paci_op = require('../middleware/login_paciente_op') 
const gerente = require('../middleware/login_gerente')
const mestre  = require('../middleware/login_mestre')
const usuario = require('../middleware/login_usuario')

/** Consultar todos os estados disponíveis */
router.get("/",usuario,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'SELECT * FROM estado;',
            (error,results,fields)=>{
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

/**
 *  Registra um novo Estado
 * 
 *  Formato da requisição
 * 
 * {
 *      "nome"             : String,   // Nome do Estado a ser registrado.
 * }
 */
router.post('/',mestre,(req,res,next)=>{

    if(!req.body.nome){return res.status(406).send("Insira o nome do estado")}

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

/**
 * Altera um Estado existente ao fornecer o seu numero identificador e um novo nome.
 * 
 * Formato da requisição
 * 
 * {
 *      "id_estado"        : Integer,  // Numero identificador do Estado.
 *      "nome"             : String,   // Nome do Estado a ser alterado.
 * }
 */
router.patch('/',mestre,(req,res,next)=>{

    if(!req.body.id_estado){return res.status(406).send("Insira o numero identificador do estado")}
    if(!req.body.nome){return res.status(406).send("Insira o novo nome do estado")}

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

/**
 * Remove um Estado a partir de seu numero identificador
 * 
 * {
 *      "id_estado"        : Integer,  // Numero identificador do Estado.
 * }
 */
router.delete('/',mestre,(req,res,next)=>{

    if(!req.body.id_estado){return res.status(406).send("Insira o número identificador do estado a ser removido")}

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