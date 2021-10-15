const { config } = require('./../config/config');

module.exports = {
  development: {
    username: "root",
    password: '',
    database: 'api-challenge',
    host: 'localhost',
    dialect: 'mysql',
  },
  production: {
    username: "root",
    password: '',
    database: 'api-challenge',
    host: 'localhost',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
}
