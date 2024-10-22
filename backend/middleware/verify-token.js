const jwt=require('jsonwebtoken');

const verifyToken=(req,res,next)=>{
    const token=req.headers['authorization']?.split(' ')[1];
    if(!token)
        return res.status(403).send("A token is required for authentication");

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
            return res.status(401).json({message:'Token has expired or is invalid'});
        }
        const currentTime=Date.now();
        if(currentTime-decoded.lastActivity > 150*60*1000){
            return res.status(401).json({message: 'Token expired due to inactivity'});
        }
        req.user=decoded;
        next();
    })
}

module.exports=verifyToken;