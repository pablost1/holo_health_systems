const express = require('express');
const router = express.Router()
const pool = require('../mysql').pool
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cadastro_medico = require('../middleware/cadastro_medico');
const cadastro_gerente = require('../middleware/cadastro_gerente');
const tempo_validade = '1h'
/**
* Rota para cadastro dos usuários
* 
* Formato da requisição
* {
*      "cpf"              : String,  // Numero do CPF do novo usuário
*      "senha"            : String,   // Senha do usuario
*      "email"            : String,   // E-mail de cadastro do novo usuario
*      "nome"             : String,   // Nome principal do usuario
*      "sobrenome"        : String,   // Ultimo nome do usuario
* }
*/
router.post('/cadastro', (req, res, next) => {
    pool.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        if (!req.body.cpf) { return res.status(406).send({ mensagem: "É necessário o CPF" }) }
        if (!req.body.nome) { return res.status(406).send({ mensagem: "É necessário o nome" }) }
        if (!req.body.sobrenome) { return res.status(406).send({ mensagem: "É necessário o sobrenome" }) }
        if (!req.body.email) { return res.status(406).send({ mensagem: "É necessário o e-mail" }) }
        if (!req.body.dt_nascimento) { return res.status(406).send({ mensagem: "É necessário a data de nascimento" }) }
        conn.query(
            'SELECT * FROM usuario WHERE cpf = ?',
            [req.body.cpf],
            (error, results, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (results.length > 0) { return res.status(409).send({ mensagem: "cpf já cadastrado" }) }
                conn.query(
                    'SELECT * FROM usuario WHERE email = ?',
                    [req.body.email],
                    (error, result, field) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        if (result.length > 0) { return res.status(409).send({ mensagem: "email já cadastrado" }) }
                        const saltRounds = 5
                        bcrypt.genSalt(saltRounds, function (err, salt) {
                            bcrypt.hash(req.body.senha, salt, (errorBcrypt, hash) => {
                                if (errorBcrypt) { return res.status(500).send({ error: errorBcrypt.message }) }

                                conn.query(
                                    'INSERT INTO usuario (cpf,nome,sobrenome,dt_nascimento,email,senha) VALUES (?,?,?,?,?,?)',
                                    [
                                        req.body.cpf,
                                        req.body.nome,
                                        req.body.sobrenome,
                                        req.body.dt_nascimento,
                                        req.body.email,
                                        hash
                                    ],
                                    (error, result, field) => {
                                        conn.release()
                                        if (error) { return res.status(500).send({ error: error }) }
                                        const response = {
                                            mensagem: "Paciente cadastrado com sucesso",
                                            usuarioCriado: {
                                                cpf: req.body.cpf,
                                                email: req.body.email
                                            }
                                        }
                                        return res.status(201).send(response)
                                    }
                                )
                            })
                        })

                    }
                )
            }
        )
    })
})
router.post("/cadastro/gerente", cadastro_gerente, (req, res, next) => {

    pool.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        if (!req.body.cpf) { return res.status(406).send({ mensagem: "É necessário o CPF" }) }
        if (!req.body.nome) { return res.status(406).send({ mensagem: "É necessário o nome" }) }
        if (!req.body.sobrenome) { return res.status(406).send({ mensagem: "É necessário o sobrenome" }) }
        if (!req.body.email) { return res.status(406).send({ mensagem: "É necessário o e-mail" }) }
        if (!req.body.dt_nascimento) { return res.status(406).send({ mensagem: "É necessário a data de nascimento" }) }
        if (!req.body.id_consultorio) { return res.status(406).send({ mensagem: "É necessário o consultório" }) }
        conn.query(
            'SELECT * FROM usuario WHERE cpf = ?',
            [req.body.cpf],
            (error, results, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (results.length > 0) { return res.status(409).send({ mensagem: "cpf já cadastrado" }) }
                conn.query(
                    'SELECT * FROM usuario WHERE email = ?',
                    [req.body.email],
                    (error, result, field) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        if (result.length > 0) { return res.status(409).send({ mensagem: "email já cadastrado" }) }
                        conn.query("SELECT * FROM gerente WHERE id_consultorio=?", [req.body.id_consultorio], (error, results, fields) => {
                            if (error) { return res.status(500).send({ error: error }) }
                            if (results.length > 0) { return res.status(409).send({ mensagem: "Consultório já possui gerente" }) }
                            const saltRounds = 5
                            bcrypt.genSalt(saltRounds, function (err, salt) {
                                bcrypt.hash(req.body.senha, salt, (errorBcrypt, hash) => {
                                    if (errorBcrypt) { return res.status(500).send({ error: errorBcrypt.message }) }

                                    conn.query(
                                        'INSERT INTO usuario (cpf,nome,sobrenome,dt_nascimento,email,senha) VALUES (?,?,?,?,?,?)',
                                        [
                                            req.body.cpf,
                                            req.body.nome,
                                            req.body.sobrenome,
                                            req.body.dt_nascimento,
                                            req.body.email,
                                            hash
                                        ],
                                        (error, result, field) => {
                                            if (error) { return res.status(500).send({ error: error }) }
                                            conn.query('INSERT INTO gerente (cpf_gerente,id_consultorio) VALUES (?,?)', [req.body.cpf, req.body.id_consultorio], (error, results, fields) => {
                                                conn.release()
                                                if (error) { return res.status(500).send({ error: error }) }
                                                const response = {
                                                    mensagem: "Gerente cadastrado com sucesso",
                                                    usuarioCriado: {
                                                        cpf: req.body.cpf,
                                                        email: req.body.email,
                                                        id_consultorio: req.body.id_consultorio
                                                    }
                                                }
                                                return res.status(201).send(response)
                                            })
                                        }
                                    )
                                })
                            })
                        })


                    }
                )
            }
        )
    })
})
router.post("/cadastro/medico", cadastro_medico, (req, res, next) => {
    pool.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ mensagem: error }) }
        if (!req.body.cpf) { return res.status(406).send({ mensagem: "É necessário o CPF" }) }
        if (!req.body.nome) { return res.status(406).send({ mensagem: "É necessário o nome" }) }
        if (!req.body.sobrenome) { return res.status(406).send({ mensagem: "É necessário o sobrenome" }) }
        if (!req.body.email) { return res.status(406).send({ mensagem: "É necessário o e-mail" }) }
        if (!req.body.crm) { return res.status(406).send({ mensagem: "É necessário o CRM" }) }
        if (!req.body.dt_nascimento) { return res.status(406).send({ mensagem: "É necessário a data de nascimento" }) }
        if (!req.body.especialidade) { return res.status(406).send({ mensagem: "É necessário a especialidade" }) }
        if (req.body.geral == null) { return res.status(406).send({ mensagem: "O médico é ou não clinico geral" }) }

        conn.query(
            'SELECT * FROM usuario WHERE cpf = ?',
            [req.body.cpf],
            (error, results, fields) => {
                if (error) { return res.status(500).send({ mensagem: error }) }
                if (results.length > 0) { return res.status(409).send({ mensagem: "cpf já cadastrado" }) }
                conn.query(
                    'SELECT * FROM usuario WHERE email = ?',
                    [req.body.email],
                    (error, result, field) => {
                        if (error) { return res.status(500).send({ mensagem: error }) }
                        if (result.length > 0) { return res.status(409).send({ mensagem: "email já cadastrado" }) }
                        conn.query("SELECT * FROM medico WHERE crm=?", [req.body.crm], (error, results, fields) => {
                            if (error) { return res.status(500).send({ mensagem: error }) }
                            if (results.length > 0) { return res.status(409).send({ mensagem: "CRM já cadastrado" }) }
                            const saltRounds = 5
                            bcrypt.genSalt(saltRounds, function (err, salt) {
                                bcrypt.hash(req.body.senha, salt, (errorBcrypt, hash) => {
                                    if (errorBcrypt) { return res.status(500).send({ mensagem: errorBcrypt.message }) }

                                    conn.query(
                                        'INSERT INTO usuario (cpf,nome,sobrenome,dt_nascimento,email,senha) VALUES (?,?,?,?,?,?)',
                                        [
                                            req.body.cpf,
                                            req.body.nome,
                                            req.body.sobrenome,
                                            req.body.dt_nascimento,
                                            req.body.email,
                                            hash
                                        ],
                                        (error, result, field) => {
                                            if (error) { return res.status(500).send({ mensagem: error }) }
                                            conn.query('INSERT INTO medico (crm,especialidade,cpf_medico,geral) VALUES (?,?,?,?)', [req.body.crm, req.body.especialidade, req.body.cpf, req.body.geral], (error, results, fields) => {
                                                conn.release()
                                                if (error) { return res.status(500).send({ mensagem: error }) }
                                                const response = {
                                                    mensagem: "Medico cadastrado com sucesso",
                                                    usuarioCriado: {
                                                        cpf: req.body.cpf,
                                                        email: req.body.email,
                                                        crm: req.body.crm
                                                    }
                                                }
                                                return res.status(201).send(response)
                                            })
                                        }
                                    )
                                })
                            })
                        })


                    }
                )
            }
        )
    })
})
/** Rota para login
 * 
 *  Formato para requisição
 * {
 *      "login" : Integer/String // Numero do CPF / Endereço de e-mail
 *      "senha" : String        // Senha de acesso   
 * }
 */
router.post('/login', (req, res, next) => {
    if (req.body.cpf){login = true}
    if (req.body.email){login = true}
    if (!login) { return res.status(406).send({ mensagem: "É necessário inserir um dado de login(CPF ou E-mail)." }) }
    if (!req.body.senha) { return res.status(406).send({ mensagem: "É necessário inserir uma senha." }) }
    
    pool.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        const sql_query = req.body.cpf ? "SELECT * FROM usuario WHERE cpf = ?" : "SELECT * FROM usuario WHERE email = ?"
        conn.query(
            sql_query,
            [(req.body.cpf ? req.body.cpf : req.body.email)],
            (error, results, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (results.length < 1) { return res.status(401).send({ mensagem: "falha na autenticação" }) }
                bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
                    if (err) { return res.status(401).send({ mensagem: "falha na autenticação" }) }
                    if (result) {
                        conn.query("SELECT * FROM gerente WHERE cpf_gerente= ?",
                            [results[0].cpf],
                            (error, result, field) => {

                                if (error) { return res.status(500).send({ error: error }) }

                                if (result.length == 0) {
                                    conn.query("SELECT * FROM medico WHERE cpf_medico=?", [results[0].cpf], (error, result, fields) => {
                                        if (error) { return res.status(500).send({ error: error }) }

                                        if (result.length == 0) {

                                            if (results[0].cpf == "62318902364" || results[0].cpf == "701.861.504-66") {
                                                key = process.env.MESTRE_JWT_KEY
                                                tipo = "Mestre"
                                            }
                                            else {
                                                key = process.env.PACIENTE_JWT_KEY
                                                tipo = "Paciente"
                                            }

                                            const token = jwt.sign(
                                                {
                                                    cpf: results[0].cpf,
                                                    email: results[0].email
                                                },
                                                key,
                                                {
                                                    expiresIn: tempo_validade
                                                })

                                            return res.status(200).send({
                                                mensagem: "autenticado com sucesso",
                                                token: token,
                                                tipo: tipo
                                            })
                                        }
                                        else {

                                            key = process.env.MEDICO_JWT_KEY
                                            tipo = "Medico"
                                            const token = jwt.sign(
                                                {
                                                    crm: result[0].crm,
                                                    cpf: results[0].cpf,
                                                    email: results[0].email
                                                },
                                                key,
                                                {
                                                    expiresIn: tempo_validade
                                                })
                                            return res.status(200).send({
                                                mensagem: "autenticado com sucesso",
                                                token: token,
                                                tipo: tipo
                                            })
                                        }
                                    })
                                }
                                else {
                                    key = process.env.GERENTE_JWT_KEY
                                    tipo = "Gerente"
                                    const token = jwt.sign(
                                        {
                                            id_consultorio: result[0].id_consultorio,
                                            cpf: results[0].cpf,
                                            email: results[0].email
                                        },
                                        key,
                                        {
                                            expiresIn: tempo_validade
                                        })
                                    return res.status(200).send({
                                        mensagem: "autenticado com sucesso",
                                        token: token,
                                        tipo: tipo
                                    })
                                }
                            })
                    } else {
                        return res.status(401).send({ mensagem: "falha na autenticação" })
                    }




                })
            })
    })
})

module.exports = router