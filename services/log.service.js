const { models } = require('./../libs/sequelize');
const moment = require('moment');
const { LOGS } = require('../db/models/logs.model');
class MovementService {

  async get() {
    const rta = await models.Log.findAll({
      include: [
        {
          as: 'movement',
          model: models.Movement,
          include: [
              'user',
              'team'
          ]
        }
      ],
      where: {
        deletedAt: null
      },
    });
    return rta;
  }
}

module.exports = MovementService;
