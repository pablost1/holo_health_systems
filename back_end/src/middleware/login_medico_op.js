const jwt =  require("jsonwebtoken");
module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token,process.env.MEDICO_JWT_KEY)
        req.usuario = decode
        next()
    } catch(error){
        next()
    }
}