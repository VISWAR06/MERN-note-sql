const express=require('express')
const route=express.Router()
const auth = require('../middleware/auth')
const {create} = require('../controllerss/notescontroller')
const { getnote ,update,del} = require('../controllerss/notescontroller')



route.post("/",auth,create)
route.get('/',auth,getnote)
route.put('/:id',auth,update)
route.delete('/:id',auth,del)







module.exports=route