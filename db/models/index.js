const { User, UserSchema } = require('./user.model');
const {Account, AccountSchema} = require('./account.model')
const {Team, TeamSchema} = require('./team.model')
function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Account.init(AccountSchema, Account.config(sequelize));
  Team.init(TeamSchema, Team.config(sequelize));


  User.associate(sequelize.models);
  Account.associate(sequelize.models);
  Team.associate(sequelize.models);
}

module.exports = setupModels;
