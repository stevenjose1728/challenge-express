const express = require('express');
const passport = require('passport');
const { checkAdminRole } = require('../middlewares/auth.handler');
const AccountService = require('./../services/account.service');

const router = express.Router();
const service = new AccountService();

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
