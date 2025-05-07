const express=require('express')
const route=express.Router()
const auth = require('../middleware/auth')
const {create} = require('../controllerss/notescontroller')
const { getnote ,update} = require('../controllerss/notescontroller')



route.post("/",auth,create)
route.get('/',auth,getnote)
route.put('/:id',auth,update)







module.exports=route