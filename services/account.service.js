const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');
const { models } = require('./../libs/sequelize');
class AccountService {

  async get() {
    const rta = await models.Account.findAll({
      attributes: {
          exclude: ['password']
      },
      include: ['user', 'responsable'],
      where: {
        deletedAt: null
      },
    });
    return rta;
  }
  async create(data) {
    const account = await models.Account.create({
      ...data,
    });
    return account;
  }

  async update(id, data) {
    const account = await models.Account.findByPk(id);
    const rta = await account.update(data);
    return rta;
  }
}

module.exports = AccountService;
