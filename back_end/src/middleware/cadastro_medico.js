const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    switch(req.body.tipo){
        case "M":
            try{
                const token = req.headers.authorization.split(' ')[1];
                const decode = jwt.verify(token,process.env.GERENTE_JWT_KEY);
                req.usuario = decode
                next()
            } catch(error){
                return res.status(401).send({mensagem:"usuário não possui permissão"})
            }
            break;
        case "P":
            next()
            break;
        default:
            return res.status(406).send({mensagem: "dados inválidos"})
            
    }
}