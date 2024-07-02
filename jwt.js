const jwt  = require('jsonwebtoken');   

const jwtAuthMiddleware =  (req,res,next)=>{

    const Autorization  =  req.headers.authorization ;
    if(!Autorization) res.status(401).json({error:"Token Not Found"})

    const Token = req.headers.authorization.split(' ')[1] ;  

    if(!Token) return res.status(401).json({error:"Unautherized"})

        try {
            // it return the payload that you used at the time of token creation 
            const decodedPayload = jwt.verify(Token,process.env.JWT_SECRET_KEY) ;
            //  adding new key with the userPayload that has decode value
            req.userPayload = decodedPayload;
            next()
        } catch (error) {
            console.log(error)
            res.status(401).json({error:"Invalid Token"})
        }
}

const GenerateToken = (userData)=>{
    // token will expire in 30 sec
    // return jwt.sign(userData , process.env.JWT_SECRET_KEY,{expiresIn:30})

    // first argument should be object in this case we already pass object as a argument
    return jwt.sign(userData , process.env.JWT_SECRET_KEY)
}

module.exports = {GenerateToken , jwtAuthMiddleware};