const express = require('express');
const passport = require('passport');
const UserService = require('../services/user.service');
const AuthService = require('./../services/auth.service');

const router = express.Router();
const service = new AuthService();
const userService = new UserService()

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = await userService.findByEmail(req.body.email)
      const {email, name, id, role} = user;
      const payload = {
        email,
        name,
        id,
        role
      }
      res.json(service.signToken(payload));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
