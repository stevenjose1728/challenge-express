const boom = require('@hapi/boom');

const { config } = require('./../config/config');
const {ROLES} = require('../db/models/user.model')

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkAdminRole(req, res, next) {
  const user = req.user;
  if ([ROLES.superadmin, ROLES.admin].includes(user.role)) {
    next();
  } else {
    next(boom.unauthorized());
  }
}


function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  }
}



module.exports = { checkApiKey, checkAdminRole, checkRoles }
