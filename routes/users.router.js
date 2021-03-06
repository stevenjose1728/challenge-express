const express = require('express');
const UserService = require('./../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { adminUpdateUserSchema, updateUserSchema, createUserSchema, getUserSchema } = require('./../schemas/user.schema');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcrypt');
const { checkAdminRole } = require('../middlewares/auth.handler');
const service = new UserService();

router.get('/',
  passport.authenticate('jwt', {session: false}),
  checkAdminRole,
  async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkAdminRole,
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const {body: user} = req
      if(user.password !== user.password_confirmation){
        res.status(400).json({
          message: 'Passwords doesnt match'
        })
      }else{
        const {name, email, role, password: originalPassword} = user
        const password = await bcrypt.hash(originalPassword, 10);
        const params = {
          name,
          email,
          role,
          password
        }
        await service.create(params);
        res.status(200).json({
          message: 'User was saved successfully'
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(adminUpdateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      let body = req.body;
      delete body.deletedAt
      if(!req.body.password){
        delete body.password
      }else{
        body.password = await bcrypt.hash(body.password, 10);
      }
      await service.update(id, body);
      res.json({
        message: 'User updated successfully'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/profile',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const {sub: userId} = req.user
      let body = req.body;
      delete body.deletedAt
      if(!req.body.password){
        delete body.password
      }else{
        body.password = await bcrypt.hash(body.password, 10);
      }
      const {role, email, id, name} = await service.update(userId, body);
      res.json({
        message: 'User updated successfully',
        user: {
          role: parseInt(role),
          email,
          id,
          name
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({
        msg: 'User was been deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

