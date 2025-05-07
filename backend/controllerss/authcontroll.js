const db=require('../db')
const register= async(req,res)=>{
   res.status(200).json({
    msg:"conected"
   })
   console.log(req.body)
}





module.exports={register}