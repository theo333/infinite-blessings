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

app.post('/api/blessings', async (req, res, next) => {
  try {
    const newBlessingNum = randNumGenerator();

    // create new blessing
    const blessing = await Blessing.create({
      name: req.body.name,
      comment: req.body.comment,
      blessingNum: newBlessingNum,
    });

    // add new blessing to total stats
    const stats = await Stat.findAll();
    const lastStat = stats[stats.length - 1];
    const { blessingsTotal, blessingsQty } = lastStat;
    await Stat.create({
      blessingsTotal: blessingsTotal + newBlessingNum,
      blessingsQty: blessingsQty + 1,
    });

    res.send(blessing);
  } catch (err) {
    throw new Error(err);
  }
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

// app.post('/api/stats', (req, res, next) => {
//   Stat.create(req.body)
//     .then(stat => res.send(stat))
//     .catch(next);
// });
