const { models } = require('./../libs/sequelize');
const {Sequelize} = require('sequelize')
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

  async delete(id) {
    const account = await models.Account.update(
      {
        deletedAt: Sequelize.NOW,
      },
      {
        where: {
          id
        }
      }
    );
    return account;
  }
}

module.exports = AccountService;
