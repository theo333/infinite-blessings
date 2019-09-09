const express = require('express');
const app = express();
const db = require('./db');
const { Blessing } = db.models;

module.exports = app;

app.get('/api/blessings', (req, res, next) => {
  Blessing.findAll()
    .then(blessings => res.send(blessings))
    .catch(next);
});