const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()
const verifyToken=(req,res,next)=>{
const token=req.headers['authorization']
if(!token){
    res.json({msg:"unauthorization Access"})
}
try{
    const verify=jwt.verify(token,process.env.JWT_SECRET);
    next()

}catch(er){
    console.log(er);
    res.json({msg:"Unauthorization access"})
    
}
}
module.exports=verifyToken