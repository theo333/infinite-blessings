const express = require('express');
const app = express();
const db = require('./db');
const { Blessing, Question, Stat } = db.models;

module.exports = app;

app.use(express.json());

// blessings random number generator
const randNumGenerator = () => {
  return Math.floor(Math.random() * 1000000);
};

// BLESSINGS ROUTES
app.get('/api/blessings', (req, res, next) => {
  Blessing.findAll()
    .then(blessings => res.send(blessings))
    .catch(next);
});

app.post('/api/blessings', (req, res, next) => {
  const randNum = randNumGenerator();
  Blessing.create({
    name: req.body.name,
    comment: req.body.comment,
    blessingNum: randNum,
  })
    .then(blessing => res.send(blessing))
    .catch(next);
});

app.get('/api/blessings/latest', (req, res, next) => {
  Blessing.findAll()
    .then(blessings => {
      const last = blessings.length - 1;
      console.log('backend ready to send:', blessings[last].get());
      res.send(blessings[last]);
    })
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
