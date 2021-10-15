'use strict';

const { USER_TABLE } = require('./../models/user.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      role: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'customer'
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
      deletedAt: {
        field: 'deleted_at',
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE);
  }
};
