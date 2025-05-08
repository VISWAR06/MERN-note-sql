
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
require('dotenv').config();

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;
const authroute = require('./routes/authroutes');
const notesroute = require('./routes/notesroute');

app.use('/api/auth', authroute);
app.use('/api/notes', notesroute);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});