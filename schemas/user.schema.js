const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
  password_confirmation: Joi.ref('password'),
});

const updateUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().optional(),
  password_confirmation: Joi.ref('password'),
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
