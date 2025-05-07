const express = require('express');
const cookiepar=require('cookie-parser')

const app = express();
require('dotenv').config();
app.use(cookiepar())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const port = process.env.PORT || 3000;
const authroute=require('./routes/authroutes')
const notesroute=require('./routes/notesroute')
app.use('/api/auth',authroute)
app.use('/api/notes',notesroute)











app.listen(3000, () => {
  console.log(`running in ${port}`);
});