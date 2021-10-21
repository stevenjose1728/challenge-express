const { User, UserSchema } = require('./user.model');
const {Account, AccountSchema} = require('./account.model')
const {Team, TeamSchema} = require('./team.model')
const {Movement, MovementSchema} = require('./movement.model')

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Account.init(AccountSchema, Account.config(sequelize));
  Team.init(TeamSchema, Team.config(sequelize));
  Movement.init(MovementSchema, Movement.config(sequelize));
  /**
   * Associations
   */
  User.associate(sequelize.models);
  Account.associate(sequelize.models);
  Team.associate(sequelize.models);
  Movement.associate(sequelize.models);
}

module.exports = setupModels;
