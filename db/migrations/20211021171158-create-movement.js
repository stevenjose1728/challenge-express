'use strict';

const { USER_TABLE } = require("../models/user.model");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Movements', {
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
      since: {
        type: Sequelize.DATE
      },
      until: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      deletedAt: {
        allowNull: true,
        field: 'deleted_at',
        type: Sequelize.DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Movements');
  }
};
