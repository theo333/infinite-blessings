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
      len: [0, 20],
    },
  },
  comment: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [0, 220],
    },
  },
  blessingNum: {
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
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  blessingsTotal: {
    type: INTEGER,
    defaultValue: 0,
  },
  blessingsQty: {
    type: INTEGER,
    defaultValue: 0,
  },
});

// const mapSeed = (data, model) => Promise.all(data.map(item => model.create(item)));

const syncAndSeed = async () => {
  await conn.sync({ force: false });

  // const blessings = [
  //   { name: 'Joe', blessingNum: 5 },
  //   { name: 'Susan', blessingNum: 20 },
  //   { name: 'Lisa', blessingNum: 50 },
  //   { name: 'Charlie', blessingNum: 100 },
  // ];

  // // const [joe, susan, lisa, charlie] = await Promise.all(blessings.map(blessing => Blessing.create(blessing)));
  // const [joe, susan, lisa, charlie] = await mapSeed(blessings, Blessing);

  // // console.log('joe', susan.get());

  // const questions = [
  //   { name: 'Question 1' },
  //   { name: 'Question 2' },
  //   { name: 'Question 3' },
  //   { name: 'Question 4' },
  // ];

  // const [question1, question2, question3, question4] = await mapSeed(questions, Question);

  // console.log('question1', question1.get());

  // return {
  //   //   blessings: {
  //   //     joe,
  //   //     susan,
  //   //     lisa,
  //   //     charlie,
  //   //   },
  //   questions: {
  //     question1,
  //     question2,
  //     question3,
  //     question4,
  //   },
  // };
};

module.exports = {
  syncAndSeed,
  models: {
    Blessing,
    Question,
    Stat,
  },
};
