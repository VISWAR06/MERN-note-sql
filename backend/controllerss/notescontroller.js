const db=require('../db')
const create=async(req,res)=>{
    try{
        const {notes}=req.body
        const userid=req.user.id
        // const date=new Date().toISOString().split("t")[0]
        const[result]=await db.query("insert into notes (userid,note) values (?,?) ",[userid,notes])
        res.status(200).json({msg:"creted success",
            note_id:result.insertId,userid:userid
        })
    }catch(e){
        res.status(500).json({
            msg:e.message
        })
    }

}



module.exports={create}