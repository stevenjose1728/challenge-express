const { models } = require('./../libs/sequelize');
const moment = require('moment');
const { LOGS } = require('../db/models/logs.model');
class MovementService {

  async get() {
    const rta = await models.Movement.findAll({
      include: ['user', 'team'],
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
    const log = await models.Log.create({
      type: LOGS.create,
      movementId: item.id
    })
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
