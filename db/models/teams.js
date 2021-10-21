const { Model, DataTypes, Sequelize } = require('sequelize');
const TEAM_TABLE = 'teams';
const TeamSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  createdAt: {
    allowNull: false,
    defaultValue: Sequelize.NOW,
    type: DataTypes.DATE,
    field: 'created_at',
  },
  updatedAt: {
    field: 'updated_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  deletedAt: {
    field: 'deleted_at',
    allowNull: true,
    type: Sequelize.DATE
  },
}

class Account extends Model {
  static associate(models) {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TEAM_TABLE,
      modelName: 'Teams',
      timestamps: false
    }
  }
}


module.exports = { TEAM_TABLE, TeamSchema, Account }
