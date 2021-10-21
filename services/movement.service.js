const { models } = require('./../libs/sequelize');
const moment = require('moment');
class MovementService {

  async get() {
    const rta = await models.Movement.findAll({
      where: {
        deletedAt: null
      },
    });
    return rta;
  }

  async create(data) {
    const item = await models.Movement.create({
      ...data,
    });
    return item;
  }

  async update(id, data) {
    const item = await models.Movement.findByPk(id);
    const rta = await item.update(data);
    return rta;
  }

  async delete(id) {
    const deletedAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const account = await models.Movement.update(
      {
        deletedAt
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

module.exports = MovementService;
