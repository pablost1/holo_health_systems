const express = require('express');
const router = express.Router();
const pool = require("../mysql").pool;

const gerente = require('../middleware/login_gerente')

/** Consultar todos as salas cadastradas*/
router.get("/",gerente,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query('SELECT * FROM Sala;',(error,results,fields)=>{
            conn.release()
            if(error){return res.status(500).send({error:error})}
            const response = {
                salas: results.map(sala =>{
                    return {
                        id_sala: sala.id_sala,
                        id_consultorio: sala.id_consultorio,
                        disponivel: sala.disponivel
                    }
                })
            }
            
            return res.status(200).send(response)
        })
    })
})

/**
 *  Registra uma nova sala
 * 
 *  Formato da requisição
 * 
 * {
 *      "id_consultorio"             : Integer   // Numero identificador do consultorio o qual a sala está situada.
 * }
 */
 router.post('/',gerente,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'SELECT * FROM Sala WHERE id_consultorio = ?',
            [req.body.id_consultorio],
            (error,results,fields)=>{
                if(error){return res.status(500).send({error:error})}
                conn.query(
                    'INSERT INTO Sala (id_consultorio, disponivel) VALUES (?, ?)',
                    [req.body.id_consultorio, 1],
                    (error,result,field)=>{
                        if(error){return res.status(500).send({error:error})}
                        const response = {
                            id_sala: result.insertId,
                            id_consultorio: req.body.id_consultorio,
                            disponivel: result.disponivel
                        }
                        return res.status(201).send(response)
                    }
                )
            }
        )
    })
})

/**
 * Altera os dados de uma  sala.
 * 
 * Formato da requisição
 * 
 * {
 *      "id_sala"             : Integer,  // Numero identificador do Estado.
 *      "disponivel"          : Integer,  // 0 = sala ocupada ; 1 = sala disponível
 * }
 */
router.patch('/',gerente,(req,res,next)=>{
    if(!(req.body.disponivel in[0,1])){return res.status(500).send({messagem: "Formato inválido para parâmetro 'disponível', use 0(ocupada) ou 1(disponivel)"})}
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query('SELECT * FROM Sala WHERE id_sala = ?',[req.body.id_sala],(error,results,fields)=>{
            if(error){return res.status(500).send({error:error})}
            if(results.length == 0){return res.status(404).send({mensagem: "Sala não encontrada"})}
                conn.query('UPDATE Sala SET disponivel = ? WHERE id_sala = ?',[req.body.disponivel, req.body.id_sala],(error,result,field)=>{
                    conn.release()
                    if(error){return res.status(500).send({error:error})}
                    const response = {
                        mensagem:"Status da sala alterado com sucesso",
                        estadoGerado: {
                            id_sala: req.body.id_sala,
                            id_consultorio: req.body.id_consultorio,
                            disponivel : req.body.disponivel
                        }
                    
                    }
                    return res.status(202).send(response)
                })
        })
    })
})


/**
 * Remove uma sala a partir de seu numero identificador
 * 
 * {
 *      "id_sala"        : Integer,  // Numero identificador da Sala.
 * }
 */
router.delete('/',gerente,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'DELETE FROM Sala WHERE id_sala = ?',
            [req.body.id_sala],
            (error,result,field)=>{
                if(error){return res.status(500).send({error:error})}
                return res.status(202).send({mensagem:"Sala removida com sucesso"})
            }
        )
    })
})
module.exports = router