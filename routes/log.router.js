const express = require('express');
const passport = require('passport');
const { checkAdminRole } = require('../middlewares/auth.handler');
const LogService = require('./../services/log.service');
const router = express.Router();
const service = new LogService();

router.get('/',
  passport.authenticate('jwt', {session: false}),
  checkAdminRole,
  async (req, res, next) => {
    try {
      const accounts = await service.get()
      res.json(accounts)
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
