const express = require('express');
const router = express.Router()
const pool = require('../mysql').pool
const login_paciente = require('../middleware/login_paciente')
const moment = require('moment')
router.post("/reservas_disponiveis", login_paciente, (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: err }) }
        if (!req.body.id_cidade) { return res.status(406).send("É necessário a cidade!") }
        if (!req.body.id_especialidade) { return res.status(406).send("É necessário a especialdiade!") }
        conn.query("SELECT * FROM cidade WHERE id_cidade=?", [req.body.id_cidade], (err, results) => {
            if (err) { return res.status(500).send({ error: err }) }
            if (results.length == 0) { res.status(404).send({ mensagem: "cidade não encontrada" }) }
            conn.query("SELECT * FROM especialidade WHERE id_especialidade=?", [req.body.id_especialidade], (err, results) => {
                if (err) { return res.status(500).send({ error: err }) }
                if (results.length == 0) { res.status(404).send({ mensagem: "Especialidade não encontrada" }) }
                conn.query(`
                SELECT 
                    reserva.id_reserva, reserva.data,reserva.hor_ini, reserva.hor_fin, reserva.id_sala, reserva.id_medico, usuario.nome as nome_medico, usuario.sobrenome,consultorio.nome as nome_consultorio 
                FROM 
                    reserva 
                INNER JOIN 
                    medico 
                ON 
                    reserva.id_medico = medico.crm 
                INNER JOIN 
                    usuario 
                ON 
                    medico.cpf_medico = usuario.cpf 
                INNER JOIN  
                    sala 
                ON 
                    reserva.id_sala = sala.id_sala 
                INNER JOIN 
                    consultorio 
                ON 
                    sala.id_consultorio = consultorio.id_consultorio 
                INNER JOIN 
                    endereço 
                ON 
                    consultorio.id_endereco = endereço.id_endereco 
                WHERE 
                medico.especialidade=? 
                AND 
                endereço.id_cidade=?
                AND
                reserva.data>=?
                `,
                    [req.body.id_especialidade, req.body.id_cidade,moment().format("YYYY-MM-DD")],
                    (err, results) => {
                        if (err) { return res.status(500).send({ error: err }) }
                        const response = {
                            Reservas: results.map(reserva => {
                                return {
                                    id_reserva: reserva.id_reserva,
                                    data: reserva.data,
                                    hor_ini: reserva.hor_ini,
                                    hor_fin: reserva.hor_fin,
                                    id_sala: reserva.id_sala,
                                    id_medico: reserva.id_medico,
                                    nome_medico: reserva.nome_medico,
                                    sobrenome_medico: reserva.sobrenome,
                                    nome_consultorio: reserva.nome_consultorio
                                }
                            })
                        }
                        return res.status(200).send(response)
                    }
                )

            })
        })
    })
})

router.post("/marcar_consulta", login_paciente, (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: err }) }
        if (!req.body.hor_marc) { return res.status(406).send({ mensagem: "É necessário fornecer o horário desejado." }) }
        if (!req.body.id_reserva){ return res.status(406).send({ mensagem: "É necessário fornecer a reserva." }) }
        conn.query("SELECT * FROM reserva WHERE id_reserva=?", [req.body.id_reserva], (err, results) => {
            if (err) { return res.status(500).send({ error: err }) }
            if (results.length == 0) { return res.status(404).send({ mensagem: "Reserva não encontrada" }) }
            if (req.body.hor_marc > results[0].hor_fin || req.body.hor_marc < results[0].hor_ini) { return res.status(409).send({ mensagem: "horário invalido" }) }
            conn.query("SELECT * FROM consulta WHERE id_reserva=? and cpf_paciente=? and status=0",[req.body.id_reserva,req.usuario.cpf],(err,result)=>{
                if (err) { return res.status(500).send({ error: err }) }
                if(result.length!=0){return res.status(409).send({mensagem:"Paciente já tem consulta nessa reserva."})}
                conn.query("SELECT * FROM consulta WHERE id_reserva=? and hor_marc=? and status=0", [req.body.id_reserva, req.body.hor_marc], (err, result) => {
                    if (err) { return res.status(500).send({ error: err }) }
                    if (result.length != 0) { return res.status(409).send({ mensagem: "horário ocupado" }) }
                    conn.query("SELECT * FROM consulta WHERE cpf_paciente=? and hor_marc=? and status=0", [req.usuario.cpf, req.body.hor_marc], (err, result) => {
                        if (err) { return res.status(500).send({ error: err }) }
    
                        if (result.length != 0) { return res.status(409).send({ mensagem: "Paciente já tem consulta nesse horário" }) }
                        conn.query("INSERT INTO consulta (cpf_paciente,id_medico,id_reserva,hor_marc,status) VALUES (?,?,?,?,0)", [req.usuario.cpf, results[0].id_medico, req.body.id_reserva, req.body.hor_marc], (err, result) => {
                            if (err) { return res.status(500).send({ error: err }) }
                            return res.status(201).send({ mensagem: "consulta criada com sucesso" })
                        })
                    })
                })
            } )
            
        })
    })
})

router.get("/minhas_consultas", login_paciente, (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: err }) }
        conn.query(`
        SELECT 
            consulta.id_consulta,
            consulta.id_medico,
            consulta.hor_marc,
            consulta.status,
            usuario.nome AS nome_medico,
            usuario.sobrenome,
            especialidade.nome AS especialidade,
            reserva.data,
            reserva.id_sala,
            consultorio.nome AS nome_consultorio,
            endereço.bairro,
            endereço.rua,
            endereço.numero

        FROM 
            consulta
        INNER JOIN
            medico
        ON
            consulta.id_medico=medico.crm
        INNER JOIN
            usuario
        ON
            medico.cpf_medico=usuario.cpf
        INNER JOIN
            especialidade
        ON
            medico.especialidade=especialidade.id_especialidade
        
        INNER JOIN 
            reserva
        ON 
            consulta.id_reserva=reserva.id_reserva 
        INNER JOIN
            sala
        ON
            reserva.id_sala=sala.id_sala
        INNER JOIN
            consultorio
        ON
            sala.id_consultorio=consultorio.id_consultorio
        INNER JOIN 
            endereço
        ON
            consultorio.id_endereco=endereço.id_endereco

        WHERE 
            cpf_paciente=? 
        AND 
            status=0
        `, [req.usuario.cpf], (err, results) => {
            if (err) { return res.status(500).send({ error: err }) }
            const response = {
                Consultas: results.map(consulta => {
                    return {
                        id_consulta: consulta.id_consulta,
                        id_medico: consulta.id_medico,
                        id_reserva: consulta.id_reserva,
                        data: consulta.data,
                        nome_medico: consulta.nome_medico,
                        sobrenome:consulta.sobrenome,
                        especialidade:consulta.especialidade,
                        consultorio: consulta.nome_consultorio,
                        bairro: consulta.bairro,
                        rua:consulta.rua,
                        numero:consulta.numero,
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

router.get("/proxima_consulta", login_paciente, (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: err }) }
        conn.query("SELECT * FROM consulta INNER JOIN reserva ON consulta.id_reserva=reserva.id_reserva WHERE cpf_paciente=? AND status=0 ORDER BY data ASC, hor_marc ASC", [req.usuario.cpf], (err, results) => {
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
router.delete("/cancelar_consulta",login_paciente,(req,res)=>{
    pool.getConnection((err,conn)=>{
        if (err) { return res.status(500).send({ error: err }) }
        if(!req.body.id_consulta){return res.status(406).send({mensagem:"Necessário informar consulta."})}
        conn.query("SELECT * FROM consulta WHERE cpf_paciente = ? AND id_consulta = ?",[req.usuario.cpf,req.body.id_consulta],(err,results)=>{
            if (err) { return res.status(500).send({ error: err }) }
            if(!results.length){return res.status(401).send({mensagem:"Usuário não possui permissão de cancelar essa consulta."})}
            conn.query("UPDATE consulta SET status=2 WHERE id_consulta = ?",[req.body.id_consulta],(err,results)=>{
                if (err) { return res.status(500).send({ error: err }) }
                return res.status(202).send({mensagem: "consulta cancelada com sucesso"})
            })
        })
    })
})

module.exports = router