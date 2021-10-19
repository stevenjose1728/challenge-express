const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');
const UserService = require('./user.service');
const service = new UserService();
const {ROLES} = require('../db/models/user.model')

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();;
    }
    delete user.dataValues.password;
    return user;
  }

  signToken({id, name, role, email}) {
    const payload = {
      sub: id,
      name,
      role
    }
    const response = {
      id,
      name,
      email
    }
    if([ROLES.superadmin, ROLES.admin].includes(parseInt(role))){
      response.isAdmin = true
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user: response,
      token
    };
  }
}

module.exports = AuthService;
