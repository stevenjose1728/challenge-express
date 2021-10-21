const express = require('express');
const passport = require('passport');
const { checkAdminRole } = require('../middlewares/auth.handler');
const validatorHandler = require('../middlewares/validator.handler');
const MovementService = require('./../services/movement.service');
const {createSchema, updateSchema, deleteSchema} = require('../schemas/movement.schema');
const router = express.Router();
const service = new MovementService();

router.get('/',
  passport.authenticate('jwt', {session: false}),
  checkAdminRole,
  async (req, res, next) => {
    try {
      const items = await service.get()
      res.json(items)
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(createSchema, 'body'),
  checkAdminRole,
  async (req, res, next) => {
    try {
      let params = req.body
      delete params.createdAt
      delete params.updatedAt
      delete params.deletedAt
      await service.create(req.body)
      res.json({
        message: 'Movement created successfully'
      })
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(updateSchema, 'body'),
  checkAdminRole,
  async (req, res, next) => {
    try {
      let params = req.body
      delete params.deletedAt
      await service.update(req.body.id, req.body)
      res.json({
        message: 'Movement updated successfully'
      })
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(deleteSchema, 'params'),
  checkAdminRole,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id)
      res.json({
        message: 'Movement deleted successfully'
      })
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
