const { User, UserSchema } = require('./user.model');
const {Account, AccountSchema} = require('./account.model')
const {Team, TeamSchema} = require('./team.model')
const {Movement, MovementSchema} = require('./movement.model');
const { Log, LogSchema } = require('./logs.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Account.init(AccountSchema, Account.config(sequelize));
  Team.init(TeamSchema, Team.config(sequelize));
  Movement.init(MovementSchema, Movement.config(sequelize));
  Log.init(LogSchema, Log.config(sequelize));
  /**
   * Associations
   */
  User.associate(sequelize.models);
  Account.associate(sequelize.models);
  Team.associate(sequelize.models);
  Movement.associate(sequelize.models);
  Log.associate(sequelize.models);
}

module.exports = setupModels;
