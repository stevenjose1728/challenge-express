const Joi = require('joi');

const createSchema = Joi.object({
  name: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string().required(),
  id: Joi.number().required(),
  createdAt: Joi.optional(),
  updatedAt: Joi.optional(),
  deletedAt: Joi.optional().allow(null),
});

const deleteSchema = Joi.object({
  id: Joi.number().required(),
});

module.exports = {
  createSchema,
  updateSchema,
  deleteSchema
}
