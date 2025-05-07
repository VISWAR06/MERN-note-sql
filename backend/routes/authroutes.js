const express=require('express')
const { register } = require('../controllerss/authcontroll')
const route=express.Router()


route.post('/register',register)

module.exports= route