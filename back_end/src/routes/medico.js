const express = require('express');
const router = express.Router();
const pool = require("../mysql").pool;
const login_medico = require('../middleware/login_medico');
const moment = require('moment')


router.get("/info", login_medico, (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: err }) }
        conn.query("SELECT * FROM usuario where usuario.cpf=?", [req.usuario.cpf], (err, results) => {
            if (err) { return res.status(500).send({ error: err }) }
            const response = results.map(usuario => {
                    return {
                        nome: usuario.nome_medico,
                        sobrenome: usuario.sobrenome,

                    }
                })[0]
            
            return res.status(200).send(response)
        })
    })
})

router.post("/novo_consultorio", login_medico, (req, res) => {
    console.log(req.body)

    pool.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: err }) }
        if (!req.body.id_consultorio) { return res.status(406).send({ mensagem: "É necessário o consultório." }) }
        conn.query("SELECT * FROM consultorio WHERE id_consultorio=?", [req.body.id_consultorio], (err, results) => {
            if (err) { return res.status(500).send({ error: err }) }
            if (results.length == 0) { return res.status(404).send({ mensagem: "Consultório não encontrado" }) }
            conn.query("SELECT * FROM medico_consultorio WHERE id_medico=? AND id_consultorio=?", [req.usuario.crm, req.body.id_consultorio], (err, results) => {
                if (err) { return res.status(500).send({ error: err }) }
                if (results.length != 0) { return res.status(409).send({ mensagem: "medico já está cadastrado neste consultório" }) }
                conn.query("INSERT INTO medico_consultorio (id_medico,id_consultorio) VALUES (?,?)", [req.usuario.crm, req.body.id_consultorio], (err, results) => {
                    if (err) { return res.status(500).send({ error: err }) }
                    return res.status(201).send({ mensagem: "médico registrado no consultório" })
                })
            })
        })
    })
})
router.get("/minhas_reservas", login_medico, (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: err }) }
        conn.query(
            "SELECT * FROM reserva INNER JOIN sala ON reserva.id_sala=sala.id_sala INNER JOIN consultorio ON sala.id_consultorio=consultorio.id_consultorio WHERE id_medico=? AND data>=?",
            [req.usuario.crm, moment().format("YYYY-MM-DD")],
            (err, results) => {
                if (err) { return res.status(500).send({ error: err }) }
                const response = {
                    Reservas: results.map(
                        reserva => {
                            return {
                                id_reserva: reserva.id_reserva,
                                data: reserva.data,
                                hor_ini: reserva.hor_ini,
                                hor_fin: reserva.hor_fin,
                                id_sala: reserva.id_sala,
                                id_medico: reserva.id_medico,
                                id_consultorio: reserva.id_consultorio,
                                id_endereco: reserva.id_endereco,
                                nome_consultorio: reserva.nome
                            }
                        }
                    )
                }
                return res.status(200).send(response)
            }
        )
    })
})

router.get("/reserva_em_andamento", login_medico, (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: err }) }
        conn.query(
            "SELECT * FROM reserva INNER JOIN sala ON reserva.id_sala=sala.id_sala INNER JOIN consultorio ON sala.id_consultorio=consultorio.id_consultorio WHERE id_medico=? AND data>? AND ? BETWEEN hor_ini AND hor_fin",
            [req.usuario.crm, moment().format("YYYY-MM-DD"), moment().format('LTS')],
            (err, results) => {
                if (err) { return res.status(500).send({ error: err }) }
                if (results.length == 0) { return res.status(200).send({ mensagem: "Não há reservas em andamento :D" }) }
                const response = {
                    Reservas: results.map(
                        reserva => {
                            return {
                                id_reserva: reserva.id_reserva,
                                data: reserva.data,
                                hor_ini: reserva.hor_ini,
                                hor_fin: reserva.hor_fin,
                                id_sala: reserva.id_sala,
                                id_medico: reserva.id_medico,
                                id_consultorio: reserva.id_consultorio,
                                id_endereco: reserva.id_endereco,
                                nome_consultorio: reserva.nome
                            }
                        }
                    )[0]
                }
                return res.status(200).send(response)
            }
        )
    })
})

router.get("/minhas_consultas", login_medico, (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: err }) }
        conn.query("SELECT * FROM consulta INNER JOIN reserva ON consulta.id_reserva=reserva.id_reserva WHERE consulta.id_medico=? AND status=0", [req.usuario.crm], (err, results) => {
            if (err) { return res.status(500).send({ error: err }) }
            const response = {
                Consultas: results.map(consulta => {
                    return {
                        id_consulta: consulta.id_consulta,
                        cpf_paciente: consulta.cpf_paciente,
                        id_medico: consulta.id_medico,
                        id_reserva: consulta.id_reserva,
                        data: consulta.data,
                        id_sala: consulta.id_sala,
                        hor_marc: consulta.hor_marc,
                        status: consulta.status
                    }
                })
            }
            return res.status(200).send(response)
        })
    })
})
router.post("/minhas_consultas", login_medico, (req, res) => {
    if(!req.body.id_reserva){return res.status(406).send({mensagem: "reserva necessária"})}
    pool.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: err }) }
        conn.query(`
        SELECT consulta.id_consulta, consulta.cpf_paciente, consulta.id_medico, consulta.id_reserva, 
               usuario.nome as nome_paciente, usuario.sobrenome, reserva.data, consulta.hor_marc,
               consulta.status,reserva.id_sala
        FROM consulta 
        INNER JOIN reserva 
        ON consulta.id_reserva=reserva.id_reserva 
        INNER JOIN usuario ON consulta.cpf_paciente=usuario.cpf 
        WHERE consulta.id_medico=? 
        AND status=0 
        AND consulta.id_reserva=?
        `, [req.usuario.crm,req.body.id_reserva], (err, results) => {
            if (err) { return res.status(500).send({ error: err }) }
            const response = {
                Consultas: results.map(consulta => {
                    return {
                        id_consulta: consulta.id_consulta,
                        cpf_paciente: consulta.cpf_paciente,
                        nome: consulta.nome_paciente,
                        sobrenome: consulta.sobrenome,
                        id_medico: consulta.id_medico,
                        id_reserva: consulta.id_reserva,
                        data: consulta.data,
                        id_sala: consulta.id_sala,
                        hor_marc: consulta.hor_marc,
                        status: consulta.status
                    }
                })
            }
            return res.status(200).send(response)
        })
    })
})
router.get("/proxima_consulta", login_medico, (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: err }) }
        conn.query("SELECT * FROM consulta INNER JOIN reserva ON consulta.id_reserva=reserva.id_reserva WHERE consulta.id_medico=? AND status=0 AND ORDER BY data ASC, hor_marc ASC", [req.usuario.crm], (err, results) => {
            if (err) { return res.status(500).send({ error: err }) }
            const response = {
                Consultas: results.map(consulta => {
                    return {
                        id_consulta: consulta.id_consulta,
                        cpf_paciente: consulta.cpf_paciente,
                        id_medico: consulta.id_medico,
                        id_reserva: consulta.id_reserva,
                        data: consulta.data,
                        id_sala: consulta.id_sala,
                        hor_marc: consulta.hor_marc,
                        status: consulta.status
                    }
                })[0]
            }
            return res.status(200).send(response)
        })
    })
})
router.patch("/concluir_consulta", login_medico, (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: err }) }

        conn.query("SELECT * FROM consulta WHERE id_consulta=?", [req.body.id_consulta], (err, results) => {
            if (results.length == 0) { return res.status(404).send({ mensagem: "consulta não encontrada" }) }
            if (results[0].id_medico != req.usuario.crm) { return res.status(401).send({ mensagem: "A consulta não pertence a esse médico" }) }
            conn.query("UPDATE consulta SET status=1 WHERE id_consulta=? AND id_medico=?", [req.body.id_consulta, req.usuario.crm], (err, results) => {
                if (err) { return res.status(500).send({ error: err }) }
                return res.status(202).send({ mensagem: "status de consulta alterado com sucesso" })
            })
        })
    })
})


module.exports = router