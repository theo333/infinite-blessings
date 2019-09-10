const express = require('express');
const app = express();
const db = require('./db');
const { Blessing, Question, Stat } = db.models;

module.exports = app;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// blessings random number generator
const randNumGenerator = maxNum => {
  return Math.floor(Math.random() * maxNum);
};

// BLESSINGS ROUTES
app.get('/api/blessings', (req, res, next) => {
  Blessing.findAll()
    .then(blessings => res.send(blessings))
    .catch(next);
});

app.post('/api/blessings', async (req, res, next) => {
  try {
    const newBlessingNum = randNumGenerator(1000000);

    // create new blessing
    const blessing = await Blessing.create({
      name: req.body.name,
      comment: req.body.comment,
      blessingNum: newBlessingNum,
    });

    res.send(blessing);
  } catch (err) {
    next(err);
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
app.get('/api/question', (req, res, next) => {
  Question.findAll()
    .then(questions => {
      const maxNumIndex = questions.length - 1;
      const randQuestion = questions[randNumGenerator(maxNumIndex)];
      res.send(randQuestion);
    })
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
