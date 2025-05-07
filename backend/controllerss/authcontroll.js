const db=require('../db')
const register= async(req,res)=>{
  try{
    const {username,password,contact,email}=req.body
    if(!username||!password ||!email){
        return res.status(400).json({
            msg:"usrnmae email passwrod must require"
        })
    }
 const[existing]=await db.query("select * from users where username=? or email =?",[username,email])
 console.log(existing)

  }catch(err){
    res.status(500)
    throw new Error(err.message)
  }

}





module.exports={register}