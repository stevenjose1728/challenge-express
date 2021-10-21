const { Model, DataTypes, Sequelize } = require('sequelize');
const { MOVEMENT_TABLE } = require('./movement.model');
const LOGS_TABLE = 'logs';
const LOGS = {
  create: 'create',
  edit: 'edit',
  moved: 'moved',
  delete: 'deleted'
}
const LogSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  type: {
    type: Sequelize.STRING,
    get(){
      const value = this.getDataValue('type');

      switch (value) {
        case LOGS.edit:
          return 'Se editó'
          break;
        case LOGS.delete:
          return 'Se eliminó'
          break;
        case LOGS.moved:
          return 'Se movió'
          break;
        default:
          return 'Se creó'
          break;
      }
    }
  },
  movementId: {
    type: Sequelize.INTEGER,
    field: 'movement_id',
    references: {
      model: MOVEMENT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
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

class Log extends Model {
  static associate(models) {
    this.belongsTo(models.Movement, { as: 'movement' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: LOGS_TABLE,
      modelName: 'Log',
      timestamps: false
    }
  }
}


module.exports = { LOGS_TABLE, LogSchema, Log, LOGS }
