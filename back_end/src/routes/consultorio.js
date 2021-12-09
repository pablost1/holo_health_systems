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
        conn.query('SELECT * FROM medic_consult',(error,results,field)=>{
            if(error){return res.status(500).send({error:error})}
            const response = {
                medic_consults: results.map(medic_consult =>{
                    return {
                        id_medic_consult: medic_consult.id_medic_consult,
                        id_cidade: medic_consult.id_cidade,
                        nome: medic_consult.nome

                    }
                })
            }
            return res.status(200).send(response)
        })
    })
})

/**
 * Consulta todas as medic_consults existentes
 * 
 */
 router.get('/medic_consult',usuario,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query('SELECT * FROM medic_consult',
        (error,results,field)=>{
            if(error){return res.status(500).send({error:error})}
            const response = {
                medic_consults: results.map(medic_consult =>{
                    return {
                        id_medic_consult: medic_consult.id_medic_consult,
                        id_consultorio: medic_consult.id_consultorio

                    }
                })
            }
            return res.status(200).send(response)
        })
    })
})

/**
 * Retorna uma lista com números indentificadores de médicos e seus consultórios
 * 
 */
 router.get('/medico',usuario,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query('SELECT * FROM medico_consultorio',
        (error,results,field)=>{
            if(error){return res.status(500).send({error:error})}
            const response = {
                medico_consultorio: results.map(medic_consult =>{
                    return {
                        id_medico: medic_consult.id_medico,
                        id_consultorio: medic_consult.id_consultorio

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
 *      "bairro"           : String,   // Nome do bairro.
 *      "rua"              : String,   // Nome da rua.
 *      "numero"           : String,   // Numero identificador do estabelecimento.
 *      "n_medic_consult"           : Integer   // Número de medic_consults que o consultório possui.
 * }
 */
router.post('/',mestre,(req,res,next)=>{

    if(!req.body.nome){return res.status(406).send("Insira o nome do consultório")}
    if(!req.body.id_cidade){return res.status(406).send("Insira um número identificador da cidade")}
    if(!req.body.bairro){return res.status(406).send("Insira o nome do bairro")}
    if(!req.body.rua){return res.status(406).send("Insira o nome da rua")}
    if(!req.body.numero){return res.status(406).send("Insira o numero do estabelecimento")}
    if(!req.body.n_medic_consult || req.body.n_medic_consult <= 0){return res.status(406).send("Insira um número de medic_consults válido")}

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
                                    'SELECT * FROM medic_consult WHERE id_endereco = ?',
                                    [result.insertId],
                                    (error,result,field)=>{
                                        if(error){return res.status(500).send({error:error})}
                                        if(result.length!=0){return res.status(409).send({mensagem:"Um consultório já cadastrado neste endereço"})}
                                        conn.query(
                                            'INSERT INTO medic_consult (nome, id_endereco) VALUES (?,?)',
                                            [
                                                req.body.nome,
                                                enderecoID
                                            ],
                                            (error, result, field)=>{
                                                if(error){return res.status(500).send({error:error})}
                                                id_medic_consult_bruh = result.insertId
                                                console.log(id_medic_consult_bruh)
                                                for(i = 0; i < req.body.n_medic_consult; i++) {
                                                    
                                                    
                                                    conn.query(
                                                        'INSERT INTO medic_consult (id_medic_consult) VALUES (?)',
                                                        [id_medic_consult_bruh],
                                                        (error, result, field)=>{
                                                            if(error){return res.status(500).send({error:error})}
                                                            if(i == req.body.n_medic_consult) {

                                                                
                                                            }
                                                        }
                                                    )
                                                    
                                                    
                                                }
                                                const response = {                                                                    
                                                    mensagem:"Consultório cadastrado com sucesso!",
                                                    medic_consultCriado:{
                                                        nome: req.body.nome,
                                                        medic_consult: id_medic_consult_bruh,
                                                        endereço: enderecoID
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
 *      "id_medic_consult"        : Integer   // Numero identificador do consultório. 
 * }
 */
router.patch('/',mestre,(req,res,next)=>{

    if(!req.body.nome){return res.status(406).send("Insira o nome do medic_consult")}
    if(!req.body.id_medic_consult){return res.status(406).send("Insira o número identificador do consultório")}

    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'SELECT * FROM medic_consult WHERE id_medic_consult = ?', 
            [req.body.id_medic_consult],
            (error,results,fields)=>{  
            if(error){return res.status(500).send({error:error})}
            if(results.length==0){return res.status(404).send({mensagem:"medic_consult não encontrado"})}
            conn.query(
                'SELECT * FROM medic_consult WHERE nome = ?',
                [req.body.nome],
                (error,result,field)=>{
                if(error){return res.status(500).send({error:error})}
                if(result.length>0){return res.status(409).send({mensagem:"Um consultório já foi cadastrado com esse nome"})}
                conn.query(
                    'UPDATE medic_consult SET nome = ? WHERE id_medic_consult = ?',
                    [req.body.nome,req.body.id_medic_consult],
                    (error,resul,field)=>{
                    conn.release()
                    if(error){return res.status(500).send({error:error})}
                    const response = {
                        mensagem:"medic_consult alterado com sucesso",
                        estadoGerado: {
                            id_medic_consult: req.body.id_medic_consult,
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
 *      "id_medic_consult"        : Integer   // Numero identificador do medic_consult. 
 * }
 */
router.delete('/',mestre,(req,res,next)=>{

    if(!req.body.id_medic_consult){return res.status(406).send("Insira o número identificador do medic_consult")}

    pool.getConnection((error,conn)=>{

        if(error){return res.status(500).send({error:error})}
        conn.query(
            'SELECT * FROM medic_consult WHERE id_medic_consult = ?',
            [req.body.id_medic_consult],
            (error,result,field)=>{
                if(error){return res.status(500).send({error:error})}
                if(result.length==0){return res.status(409).send("Não existe nenhum consultório com este número identificador")}

                conn.query(
                    'DELETE FROM medic_consult WHERE id_medic_consult = ?',
                    [req.body.id_medic_consult],
                    (error,result,field)=>{
                        if(error){return res.status(500).send({error:error})}
                        conn.query(
                            'DELETE FROM medic_consult WHERE id_medic_consult = ?',
                            [req.body.id_medic_consult],
                            (error,result,field)=>{
                                if(error){return res.status(500).send({error:error})}
                                return res.status(202).send({mensagem:"removido com sucesso"})
                            }
                        )
                    })
            }
        )
    })
})

module.exports = router