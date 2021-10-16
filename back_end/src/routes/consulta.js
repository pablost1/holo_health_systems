const express = require('express');
const router = express.Router();
const pool = require("../mysql").pool;

const medico = require('../middleware/login_medico') 
const paciente = require('../middleware/login_paciente')
const gerente = require('../middleware/login_gerente')

router.get('/medico/consultas',medico,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'SELECT * FROM Consulta WHERE id_medico = ?',
            [req.usuario.id_usuario],
            (error,results,fields)=>{
            if(error){return res.status(500).send({error:error})}
            const response = {
                consultas: results.map(consulta =>{
                    return {
                        data: consulta.data,
                        hora: consulta.hora,
                        estado:consulta.estado,
                        id_paciente: consulta.id_paciente,
                        id_medico: consulta.id_medico,
                        id_especialidade:consulta.id_especialidade,
                        id_consultorio: consulta.id_consultorio
                    }
                })
            }
            return res.status(200).send(response)
            
        })
    })
})
router.post("/medico/criarConsultas",medico,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        console.log(1)
        conn.query(
            "SELECT * FROM Especialidade WHERE id_especialidade = ?",
            [req.body.id_especialidade],
            (error,results,fields)=>{
                console.log(2)
                if(error){return res.status(500).send({error:error})}
                if(results.length == 0){return res.status(404).send({mensagem: "especialidade não encontrada"})}
                console.log(3)
                console.log(req.body.id_consultorio)
                conn.query(
                    'SELECT * FROM Consultorio WHERE id_consultorio = ?',
                    [req.body.id_consultorio],
                    (error,results,fields)=>{
                        console.log(4)
                        if(error){return res.status(500).send({error:error})}
                        if(results.length == 0){return res.status(404).send({mensagem:"consultorio não encontrado"})}
                        const horaInicio = req.body.horaInicio.split(":").map(x =>{return parseInt(x)})
                        const horaFim = req.body.horaFim.split(":").map(x =>{return parseInt(x)})
                        console.log(3)
                        for(;horaInicio[0]<=horaFim[0];horaInicio[0]++){
                            
                            for(;horaInicio[1]<(horaInicio[0]==horaFim[0] ? horaFim[1] : 59);horaInicio[1]+=10){
                                let horaFormatada = horaInicio[0].toString()+":"+horaInicio[1].toString()+":00"
                                conn.query(
                                    "insert into Consulta (data,hora,estado,id_medico,id_especialidade,id_consultorio) VALUES (?,?,?,?,?,?)",
                                    [req.body.data,horaFormatada,"disponivel",req.usuario.id_usuario,req.body.id_especialidade,req.body.id_consultorio],
                                    (error,results,fields)=>{
                                        if(error){return res.status(500).send({error:error})}
                                    }
                                    )
                                
                            }
                            horaInicio[1]=0
                            }
                        return res.status(201).send({mensagem: "consultas criadas com sucesso"})
                        }
                )
            }
        )
    })
})

router.delete('/medico/cancelarConsultas',medico,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        const horaInicio = req.body.horaInicio.split(":").map(x =>{return parseInt(x)})
        const horaFim = req.body.horaFim.split(":").map(x =>{return parseInt(x)})
        
        for(;horaInicio[0]<=horaFim[0];horaInicio[0]++){
                            
            for(;horaInicio[1]<(horaInicio[0]==horaFim[0] ? horaFim[1] : 59);horaInicio[1]+=10){
                let horaFormatada = horaInicio[0].toString()+":"+((horaInicio[1]==0)? "00" : horaInicio[1].toString())+":00"
                conn.query(
                    "DELETE FROM Consulta WHERE id_medico=? AND data=? AND hora=?",
                    [req.usuario.id_usuario,req.body.data,horaFormatada],
                    (error,results,fields)=>{
                        if(error){return res.status(500).send({error:error})}
                    }
                    )
                
            }
            horaInicio[1]=0
            }
        return res.status(202).send({mensagem: "consultas removidas com sucesso"})
    })
})
router.get('/paciente/consultas',paciente,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'SELECT * FROM Consulta WHERE id_paciente = ?',
            [req.usuario.id_usuario],
            (error,results,fields)=>{
            if(error){return res.status(500).send({error:error})}
            const response = {
                consultas: results.map(consulta =>{
                    return {
                        id_consulta: consulta.id_consulta,
                        data: consulta.data,
                        hora: consulta.hora,
                        estado:consulta.estado,
                        id_paciente: consulta.id_paciente,
                        id_medico: consulta.id_medico,
                        id_especialidade:consulta.id_especialidade,
                        id_consultorio: consulta.id_consultorio
                    }
                })
            }
            return res.status(200).send(response)
            
        })
    })
})
router.post('/paciente/consultas_disponiveis',paciente,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            "SELECT * FROM Especialidade WHERE id_especialidade=?",
            [req.body.id_especialidade],
            (error,results,fields)=>{
                if(error){return res.status(500).send({error:error})}
                if(results.length==0){return res.status(404).send({mensagem:"especialidade não encontrada"})}
                conn.query(
                    "SELECT * FROM Consultorio WHERE id_consultorio=?",
                    [req.body.id_consultorio],
                    (error,results,fields)=>{
                        if(error){return res.status(500).send({error:error})}
                        if(results.length==0){return res.status(404).send({mensagem:"consultorio não encontrado"})}
                        conn.query(
                            "SELECT * FROM Consulta WHERE id_especialidade=? AND id_consultorio=? AND estado='disponivel'",
                            [req.body.id_especialidade,req.body.id_consultorio],
                            (error,results,fields)=>{
                                if(error){return res.status(500).send({error:error})}
                                const response  = {
                                    consultas: results.map(consulta =>{
                                        return {
                                            id_consulta: consulta.id_consulta,
                                            data: consulta.data,
                                            hora: consulta.hora,
                                            estado:consulta.estado,
                                            id_paciente: consulta.id_paciente,
                                            id_medico: consulta.id_medico,
                                            id_especialidade:consulta.id_especialidade,
                                            id_consultorio: consulta.id_consultorio
                                        }
                                    })
                                }
                                return res.status(200).send(response)
                            }
                        )
                    }
                )
            }
        )
    })
})

router.patch('/paciente/marcar_consulta',paciente,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            "SELECT * FROM Consulta WHERE id_consulta = ?",
            [req.body.id_consulta],
            (error,results,fields)=>{
                if(error){return res.status(500).send({error:error})}
                if(results.length==0){return res.status(404).send({mensagem:"consulta não encontrada"})}
                conn.query(
                    "UPDATE Consulta SET id_paciente=?, estado='marcada' WHERE id_consulta=?",
                    [req.usuario.id_usuario,req.body.id_consulta],
                    (error,results,fields)=>{
                        if(error){return res.status(500).send({error:error})}
                        return res.status(202).send({mensagem:"consulta marcada com sucesso"})
                    }
                )
            }
        )
    })
})
router.delete('/paciente/cancelar_consulta',paciente,(req,res,next)=>{
    pool.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            "SELECT * FROM Consulta WHERE id_consulta=?",
            [req.body.id_consulta],
            (error,results,fields)=>{
                if(error){return res.status(500).send({error:error})}
                if(results[0].id_paciente!=req.usuario.id_usuario){return res.status(401).send({mensagem:"cancelamento não autorizado"})}
                conn.query(
                    "UPDATE Consulta SET id_paciente=null, estado='disponivel' WHERE id_consulta=?",
                    [req.body.id_consulta],
                    (error,results,fields)=>{
                        if(error){return res.status(500).send({error:error})}
                        return res.status(202).send({mensagem:"consulta cancelada com sucesso"})
                    }
                )
            }
        )
    })
})

module.exports = router