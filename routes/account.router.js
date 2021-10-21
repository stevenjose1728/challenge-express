const express = require('express');
const passport = require('passport');
const { checkAdminRole } = require('../middlewares/auth.handler');
const validatorHandler = require('../middlewares/validator.handler');
const AccountService = require('./../services/account.service');
const {createAccountSchema, updateUserSchema} = require('../schemas/account.schema');
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

router.post('/',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(createAccountSchema, 'body'),
  checkAdminRole,
  async (req, res, next) => {
    try {
      await service.create(req.body)
      res.json({
        message: 'Account created successfully'
      })
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(updateUserSchema, 'body'),
  checkAdminRole,
  async (req, res, next) => {
    try {
      await service.update(req.body.id, req.body)
      res.json({
        message: 'Account updated successfully'
      })
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
