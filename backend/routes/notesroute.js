const express=require('express')
const route=express.Router()
const auth = require('../middleware/auth')
const {create} = require('../controllerss/notescontroller')



route.post("/",auth,create)








module.exports=route