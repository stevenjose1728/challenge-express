const { Model, DataTypes, Sequelize } = require('sequelize');
const {USER_TABLE} = require('./user.model')
const ACCOUNT_TABLE = 'accounts';
const AccountSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
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
  responsableId: {
    type: Sequelize.INTEGER,
    field: 'responsable_id',
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  teamConsultation: {
    type: Sequelize.STRING,
    field: 'team_consultation',
    allowNull: true
  },
  createdAt: {
    allowNull: true,
    field: 'created_at',
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: true,
    field: 'updated_at',
    type: Sequelize.DATE
  },
  deletedAt: {
    allowNull: true,
    field: 'deleted_at',
    type: Sequelize.DATE
  }
}

class Account extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });
    this.belongsTo(models.User, { as: 'responsable' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ACCOUNT_TABLE,
      modelName: 'Account',
      timestamps: false
    }
  }
}


module.exports = { ACCOUNT_TABLE, AccountSchema, Account }
