const express = require('express');

const usersRouter = require('./users.router');
const authRouter = require('./auth.router');
const accountRouter = require('./account.router');
const teamRouter = require('./team.router')
const movementRouter = require('./movement.router')
const logRouter = require('./log.router')
function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/auth', authRouter);
  router.use('/accounts', accountRouter);
  router.use('/teams', teamRouter);
  router.use('/movements', movementRouter);
  router.use('/logs', logRouter);
}

module.exports = routerApi;
