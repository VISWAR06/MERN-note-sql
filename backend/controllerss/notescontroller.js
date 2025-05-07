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
const getnote= async(req,res)=>{
    try{
        const userid=req.user.id
        const[notes]=await db.query("select * from notes where userid=?",[userid])
        res.json({
            notes
        })

    }
    catch(e){
        res.status(500).json({
            msg:e.message
        })
    }
}

const update=async(req,res)=>{
    try{
const userid=req.user.id
const{notes}=req.body
const noteid=req.params.id
const[result]=await db.query("update notes set note=? where userid=? and noteid=?",[notes,userid,noteid])
if(result.affectedRows===0){
    res.status(404).json({
        msg:"no notes in that"
    })
}
res.status(200).json("note updated")
    }
    catch(e){
        res.status(500).json({
            msg:e.message
        })
    }
}
const del=async(req,res)=>{
try{
    const userid=req.user.id
    const noteid=req.params.id
    const [result]=await db.query('delete from notes where userid=? and noteid=?',[userid,noteid])
    if(result.affectedRows===0){
        res.json("no noted in id")
    }
    res.json("delted success")
}
 catch(e){
        res.status(500).json({
            msg:e.message
        })
    }
}

module.exports={create,getnote,update,del}