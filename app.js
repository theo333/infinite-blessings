const express = require('express');
const app = express();
const db = require('./server/db');
const { Blessing, Question, Stat } = db.models;

module.exports = app;

app.use(express.json());

// BLESSINGS ROUTES
app.get('/api/blessings', (req, res, next) => {
  Blessing.findAll()
    .then(blessings => res.send(blessings))
    .catch(next);
});

app.post('/api/blessings', (req, res, next) => {
  Blessing.create(req.body)
    .then(blessing => res.send(blessing))
    .catch(next);
});

// QUESTIONS ROUTES
app.get('/api/questions', (req, res, next) => {
  Question.findAll()
    .then(questions => res.send(questions))
    .catch(next);
});

// STATS ROUTES
app.get('/api/stats', (req, res, next) => {
  Stat.findAll()
    .then(stats => res.send(stats))
    .catch(next);
});

app.post('/api/stats', (req, res, next) => {
  Stat.create(req.body)
    .then(stat => res.send(stat))
    .catch(next);
});
