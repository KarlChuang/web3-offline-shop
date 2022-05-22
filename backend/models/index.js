const {
  Sequelize, DataTypes,
} = require('sequelize');
require('dotenv').config();

const DATABASE_URL = process.env.POSTGRES_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable not set!');
}

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {},
});

// Test authentication
(async function () {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}());

const db = {};

const Contract = sequelize.define('Contract', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  symbol: {
    type: DataTypes.STRING,
  },
});

const Signature = sequelize.define('Signature', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  signer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contractAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tokenId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  digest: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

// Sync database
const sync = async () => {
  await Contract.sync();
  await Signature.sync();
};
sync();

db.Contract = Contract;
db.Signature = Signature;
module.exports = db;
