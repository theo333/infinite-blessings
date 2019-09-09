const Sequelize = require('sequelize');
const { UUID, UUIDV4, STRING, INTEGER } = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/infinite_blessings');

const Blessing = conn.define('blessing', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: STRING
  },
  comment: {
    type: STRING
  },
  blessingsNum: {
    type: INTEGER
  }
});

const syncAndSeed = async () => {
  await conn.sync({ force: true })

  const blessings = [
    { firstName: 'Joe' },
    { firstName: 'Susan' },
    { firstName: 'Lisa' },
    { firstName: 'Charlie' }
  ];

  const [joe, susan, lisa, charlie] = await Promise.all(blessings.map(blessing => Blessing.create(blessing)));

  console.log('joe', joe.get());

  return {
    blessings: {
      joe,
      susan,
      lisa,
      charlie
    }
  }
};

module.exports = {
  syncAndSeed,
  models: {
    Blessing
  }
};



