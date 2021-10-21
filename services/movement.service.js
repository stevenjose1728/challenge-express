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
    const type = (item.teamId !== data.teamId || item.userId !== data.userId) ? LOGS.moved : LOGS.edit
    const log = await models.Log.create({
      type,
      movementId: item.id
    })
    const rta = await item.update(data);
    return rta;
  }

  async delete(id) {
    const deletedAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const item = await models.Movement.update(
      {
        deletedAt
      },
      {
        where: {
          id
        }
      }
    );
    const log = await models.Log.create({
      type: LOGS.delete,
      movementId: id
    })
    return item;
  }
}

module.exports = MovementService;
