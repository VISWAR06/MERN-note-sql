const db=require('../db')
const enct=require('bcryptjs')
const register= async(req,res)=>{
  try{
    const {username,password,contact,email}=req.body
    const profile_image=null
    if(!username||!password ||!email){
        return res.status(400).json({
            msg:"usrnmae email passwrod must require"
        })
    }
 
    const[existing]=await db.query("select * from users where username=? or email =?",[username,email])
    if(existing.length>0){
        return res.status(400).json({msg:"already exists"})
    }

const hashpass= await enct.hash(password,10)
const sql="insert into users (username,email,contact,password,profile_image) values(?,?,?,?,?)"
await db.query(sql,[username,email,contact||null,hashpass,profile_image])
res.status(201).json({
    msg:"creatd successfullly "
})

  }catch(err){
    res.status(500)
    throw new Error(err.message)
  }

}





module.exports={register}