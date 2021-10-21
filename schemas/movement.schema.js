const Joi = require('joi');

const createSchema = Joi.object({
  userId: Joi.number().required(),
  teamId: Joi.number().required(),
  since: Joi.date().required(),
  until: Joi.date().required()
});

const updateSchema = Joi.object({
  userId: Joi.number().required(),
  teamId: Joi.number().required(),
  since: Joi.date().required(),
  until: Joi.date().required(),
  id: Joi.number().required(),
});

const deleteSchema = Joi.object({
  id: Joi.number().required(),
});

module.exports = {
  createSchema,
  updateSchema,
  deleteSchema
}
