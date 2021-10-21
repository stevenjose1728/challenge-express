const { models } = require('./../libs/sequelize');
const moment = require('moment');
class TeamService {

  async get() {
    const rta = await models.Team.findAll({
      where: {
        deletedAt: null
      },
    });
    return rta;
  }
  async create(data) {
    const account = await models.Team.create({
      ...data,
    });
    return account;
  }

  async update(id, data) {
    const account = await models.Team.findByPk(id);
    const rta = await account.update(data);
    return rta;
  }

  async delete(id) {
    const deletedAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const account = await models.Team.update(
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

module.exports = TeamService;
