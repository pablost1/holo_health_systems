const express = require('express');
const router = express.Router();
const pool = require("../mysql").pool;

const paci_op = require('../middleware/login_paciente_op')
const gerente = require('../middleware/login_gerente')

/** Consulta o nome de todas as especialidades */
router.get("/", paci_op, (req, res, next) => {
    pool.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query('SELECT * FROM Especialidade;', (error, results, fields) => {
            conn.release()
            if (error) { return res.status(500).send({ error: error }) }
            const response = {
                Especialidades: results.map(especialidade => {
                    return {
                        id_especialidade: especialidade.id_especialidade,
                        nome: especialidade.nome
                    }
                })
            }

            return res.status(200).send(response)
        })
    })
})

/**
* Cadastra uma nova especialidade ao fornecer um nome
* 
* Formato da requisição
* {
*      "nome"              : String,   // nome da especialidade a ser registrada
* }
*/
router.post('/', gerente, (req, res, next) => {
    pool.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM Especialidade WHERE nome = ?',
            [req.body.nome],
            (error, results, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (results.length > 0) { return res.status(409).send({ mensagem: "Especialidade já cadastrado" }) }
                conn.query(
                    'INSERT INTO Especialidade (nome) VALUES (?)',
                    [req.body.nome],
                    (error, result, field) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        const response = {
                            id_especialidade: result.insertId,
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
 * Atualiza o nome de uma especialidade a partir de seu numero identificador.
 * 
 *  Formato da requisição
 * {
 *      "id_especialidade" : Integer,  // Numero identificador da especialidade a ser alterada.
 *      "nome"             : String,   // Novo nome da especialidade.
 * }
 */
router.patch('/', gerente, (req, res, next) => {
    pool.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query('SELECT * FROM Especialidade WHERE id_especialidade = ?', [req.body.id_especialidade], (error, results, fields) => {
            if (error) { return res.status(500).send({ error: error }) }
            if (results.length == 0) { return res.status(404).send({ mensagem: "Especialidade não encontrada" }) }
            conn.query('SELECT * FROM Especialidade WHERE nome = ?', [req.body.nome], (error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length > 0) { return res.status(409).send({ mensagem: "Especialidade já cadastrada" }) }
                conn.query('UPDATE Especialidade SET nome = ? WHERE id_especialidade = ?', [req.body.nome, req.body.id_especialidade], (error, resul, fiel) => {
                    conn.release()
                    if (error) { return res.status(500).send({ error: error }) }
                    const response = {
                        mensagem: "Especialidade alterada com sucesso",
                        estadoGerado: {
                            id_especialidade: req.body.id_especialidade,
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
 * Deleta uma especialidade a partir de seu numero identificador
 * 
 * Formato de requisição
 * {
 *      "id_especialidade" : : Integer,   // Numero identificador da especialidade.
 * }
 */
router.delete('/', gerente, (req, res, next) => {
    pool.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'DELETE FROM Especialidade WHERE id_especialidade = ?',
            [req.body.id_especialidade],
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(202).send({ mensagem: "removido com sucesso" })
            }
        )
    })
})

module.exports = router