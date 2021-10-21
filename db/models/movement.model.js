const { Model, DataTypes, Sequelize } = require('sequelize');
const { TEAM_TABLE } = require('./team.model');
const { USER_TABLE } = require('./user.model');
const MOVEMENT_TABLE = 'movements';
const MovementSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userId: {
    type: Sequelize.INTEGER,
    field: 'user_id',
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  teamId: {
    type: Sequelize.INTEGER,
    field: 'team_id',
    references: {
      model: TEAM_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  since: {
    type: Sequelize.DATE
  },
  until: {
    type: Sequelize.DATE
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    allowNull: false,
    field: 'updated_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  deletedAt: {
    allowNull: true,
    field: 'deleted_at',
    type: DataTypes.DATE
  }
}

class Movement extends Model {
  static associate(models) {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MOVEMENT_TABLE,
      modelName: 'Movement',
      timestamps: false
    }
  }
}


module.exports = { MOVEMENT_TABLE, MovementSchema, Movement }
