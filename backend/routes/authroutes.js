const express=require('express')
const { register,login ,curruser} = require('../controllerss/authcontroll')
const auth =require('../middleware/auth')
const route=express.Router()


route.post('/register',register)
route.post('/login',login)
route.get('/me',auth,curruser)

module.exports= route