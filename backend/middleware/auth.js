const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
const token=req.cookies.token
if(!token)return res.status(401).json({msg:"no token"})
    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decode
       next()
    
    }catch(err){
        res.status(500).json({msg:"server side problem"})
    }
}

module.exports=auth