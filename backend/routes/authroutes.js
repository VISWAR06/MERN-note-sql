
const express = require('express');
const { register, login, curruser } = require('../controllers/authcontroller');
const auth = require('../middleware/auth');
const route = express.Router();

route.post('/register', register);
route.post('/login', login);
route.get('/me', auth, curruser);

route.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true });
  res.status(200).json({ msg: 'Logged out successfully' });
});

module.exports = route;