'use strict';
const bcrypt = require('bcrypt')
const {ROLES} = require('../models/user.model')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash('admin.123', 10);
    await queryInterface.bulkInsert('users', [{
      name: 'Super admin',
      email: 'superadmin@mail.com',
      password,
      role: ROLES.superadmin
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
