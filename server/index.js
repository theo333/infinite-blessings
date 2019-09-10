const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = require('./app');
const db = require('./db');

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

// *** look at this for solution  https://github.com/fullstackreact/food-lookup-demo/issues/49

app.get('/app.js', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', 'main.js'));
});

app.use(express.static(path.join(__dirname, '../public')));

db.syncAndSeed().then(() => {
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
});
