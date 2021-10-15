const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');

const options = {
  dialect: 'mysql',
  logging: !config.isProd,
}

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}
const sequelize = new Sequelize('api-challenge', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

setupModels(sequelize);

module.exports = sequelize;
