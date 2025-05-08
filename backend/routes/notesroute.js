
const express = require('express');
const route = express.Router();
const auth = require('../middleware/auth');
const { create, getnote, update, del } = require('../controllers/notescontroller');

route.post("/", auth, create);
route.get('/', auth, getnote);
route.put('/:id', auth, update);
route.delete('/:id', auth, del);

module.exports = route;