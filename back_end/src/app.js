const express = require("express");
const morgan =  require('morgan');

const app = express();

const routerUsuario = require('./routes/usuario')
const routerEstado = require('./routes/estado')
const routerCidade = require('./routes/cidade')
const routerConsultorio = require('./routes/consultorio')
const routerEspecialidades = require('./routes/especialidades')
const routerEspeconsul = require('./routes/especonsul')
const routerConsultas = require('./routes/consulta')

//tratamento inicio
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use((req,res,next)=>{
    
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Content-Type', 'application/json');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        )
    res.setHeader('Access-Control-Allow-Credentials','false')
    if(req.method === "OPTIONS"){
        res.setHeader('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
        return res.status(200).send({})
    }
    next();
})  

//rotas

app.use('/usuario',routerUsuario)
app.use('/estado',routerEstado)
app.use('/cidade',routerCidade)
app.use('/consultorio',routerConsultorio)
app.use('/especialidade',routerEspecialidades)
app.use('/especialidade_consultorio',routerEspeconsul)
app.use('/consulta',routerConsultas)

//tratamento fim
app.use((req,res,next)=>{
    const erro =  new Error("não encontrado")
    erro.status = 404
    next(erro)
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    return res.send({
        erro:{
            mensagem:error.message
        }
    })
})

module.exports = app