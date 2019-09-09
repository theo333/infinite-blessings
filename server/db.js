const Sequelize = require('sequelize');
const { UUID, UUIDV4, STRING, INTEGER } = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/infinite_blessings', {
  logging: false,
});

const Blessing = conn.define('blessing', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      // char limit 15 char
    },
  },
  comment: {
    type: STRING,
  },
  blessingsNum: {
    type: INTEGER,
  },
});

const Question = conn.define('question', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING,
  },
});

const Stat = conn.define('stat', {
  id: {
    type: UUID,
    primaryKey: true,
  },
  blessingsTotal: {
    type: INTEGER,
  },
  blessingsQty: {
    type: INTEGER,
  },
});

const mapSeed = (data, model) => Promise.all(data.map(item => model.create(item)));

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  const blessings = [
    { name: 'Joe', blessingsNum: 5 },
    { name: 'Susan', blessingsNum: 20 },
    { name: 'Lisa', blessingsNum: 50 },
    { name: 'Charlie', blessingsNum: 100 },
  ];

  // const [joe, susan, lisa, charlie] = await Promise.all(blessings.map(blessing => Blessing.create(blessing)));
  const [joe, susan, lisa, charlie] = await mapSeed(blessings, Blessing);

  // console.log('joe', susan.get());

  const questions = [
    { name: 'Question 1' },
    { name: 'Question 2' },
    { name: 'Question 3' },
    { name: 'Question 4' },
  ];

  const [question1, question2, question3, question4] = await mapSeed(questions, Question);

  // console.log('question1', question1.get());

  return {
    blessings: {
      joe,
      susan,
      lisa,
      charlie,
    },
    questions: {
      question1,
      question2,
      question3,
      question4,
    },
  };
};

module.exports = {
  syncAndSeed,
  models: {
    Blessing,
    Question,
    Stat,
  },
};
