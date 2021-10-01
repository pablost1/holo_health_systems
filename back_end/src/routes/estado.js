const express = require('express');
const router = express.Router();
const pool = require("../mysql").pool;

router.get("/",(req,res,next)=>{
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

module.exports = router