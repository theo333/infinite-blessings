const express = require('express');
const app = express();
const db = require('./db')
const path = require('path');
const morgan = require('morgan');

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

db.syncAndSeed()
  .then(() => {
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  })
