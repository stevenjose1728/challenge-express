const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';
const ROLES = {
  superadmin: 1,
  admin: 2,
  user: 3
}
const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name:{
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING
  },
  role: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: ROLES.user
  },
  createdAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  deletedAt: {
    type: Sequelize.DATE,
    field: 'deleted_at',
    allowNull: true
  }
}

class User extends Model {
  static associate(models) {
    // this.hasOne(models.Customer, {
    //   as: 'customer',
    //   foreignKey: 'userId'
    // });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}


module.exports = { USER_TABLE, UserSchema, User, ROLES }
