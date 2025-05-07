const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const port = process.env.PORT || 3000;
const authroute=require('./routes/authroutes')
app.use('/api/auth',authroute)











app.listen(3000, () => {
  console.log(`running in ${port}`);
});