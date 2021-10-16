const jwt =  require("jsonwebtoken");
const med_op = require("./login_medico_op")
module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token,process.env.PACIENTE_JWT_KEY)
        req.usuario = decode
        next()
    } catch(error){
        med_op(req,res,next)
    }
}