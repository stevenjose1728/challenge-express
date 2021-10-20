const { User, UserSchema } = require('./user.model');
const {Account, AccountSchema} = require('./account.model')

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Account.init(AccountSchema, Account.config(sequelize));
  User.associate(sequelize.models);
  Account.associate(sequelize.models);
}

module.exports = setupModels;
