const express = require('express');
const passport = require('passport');

const AuthService = require('./../services/auth.service');

const router = express.Router();
const service = new AuthService();

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const {email, password} = req.body;
      const user = {
        email,
        password
      }
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
