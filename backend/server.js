const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;











app.listen(3000, () => {
  console.log('Server is running on port 5000');
});