const express = require('express');
const router = express.Router();
const pool = require("../mysql").pool;
 
const paci_op = require('../middleware/login_paciente_op') 
const gerente = require('../middleware/login_gerente')
const mestre  = require('../middleware/login_mestre')
const usuario = require('../middleware/login_usuario')

/** Consultar todos os telefones */
router.get('/', gerente,(req, res, next)=> {
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        console.log('3')
        conn.query(
            'SELECT * FROM telefone;',
            (error,results,fields) =>{
                if(error){return res.status(500).send({error:error})}
                console.log(results.length>0)
                const response = {
                    telefones: results.map(dbTelefones =>{
                        return{
                            id_consultorio: dbTelefones.id_consultorio,
                            telefone: dbTelefones.telefone
                        }
                    })
                }
            console.log('1')
            return res.status(200).send(response)
            }
        )
    })
})

/** Cadastrar telefone em um consultório
 * 
 * Formato da requisição
 * {
 *      id_consultorio : Integer,  // Numero identificador do consultório
 *      telefone       : String    // Numero do telefone do consultório específicado
 * }
 * 
*/
router.post('/', gerente,(req,res,next) => {

    if(!req.body.id_consultorio){return res.status(406).send("Insira o número identificador do consultório")}
    if(!req.body.telefone){return res.status(406).send("Insira o número do telefone do consultório")}
    
    console.log(req.body.id_consultorio)
    console.log(req.body.telefone)

    pool.getConnection((error, conn)=>{
        conn.query(
            'SELECT * FROM telefone WHERE id_consultorio = ?',
            [req.body.id_consultorio],
        (error,results,fields) => {
            if(error){return res.status(500).send({error:error})}
            if(results.length>0){return res.status(409).send("Este consultório já possui um telefone associado.")}
            conn.query(
                'INSERT INTO telefone (id_consultorio, telefone) VALUES (?,?)',
                [
                    req.body.id_consultorio,
                    req.body.telefone
                ],
                    (error,results,fields) => {
                        if(error){return res.status(500).send({error:error})}
                        const response = {
                            mensagem: "Telefone cadastrado com sucesso!",
                            telefone_cadastrado: {
                                id_consultorio : req.body.id_consultorio,
                                telefone : req.body.telefone
                            }
                        }
                        return res.status(201).send(response)
                    }
            )
        }
        )

    })
})

/** Remover um telefone
 * {
 *      id_consultorio : String //
 * }
 * 
 * 
 */
router.delete('/',gerente,(req,res,next)=>{
    if(!req.body.id_consultorio){return res.status(406).send("Insira o número identificador do consultório")}
    pool.getConnection((error, conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'SELECT * FROM telefone WHERE id_consultorio = ?',
            [req.body.id_consultorio],
            (error,results,fields) => {
                if(error){return res.status(500).send({error:error})}
                if(results.length==0){return res.status(409).send("Este consultório não possui um número de elefone associado")}
                conn.query(
                    'DELETE FROM telefone WHERE id_consultorio = ?',
                    [req.body.id_consultorio],
                    (error,results,fields)=>{
                        if(error){return res.status(500).send({error:error})}
                        return res.status(202).send({mensagem:"Telefone removido do consultório com sucesso!"})
                    }
                )   
            }
        )
    })
})


module.exports =router