const Joi = require('joi');

const createAccountSchema = Joi.object({
  createdAt: Joi.optional(),
  deletedAt: Joi.optional().allow(null),
  name: Joi.string().required(),
  responsableId: Joi.number().required(),
  teamConsultation: Joi.string().required(),
  updatedAt: Joi.optional(),
  userId: Joi.number().required()
});

const updateUserSchema = Joi.object({
  createdAt: Joi.optional(),
  deletedAt: Joi.optional().allow(null),
  name: Joi.string().required(),
  responsableId: Joi.number().required(),
  teamConsultation: Joi.string().required(),
  updatedAt: Joi.optional(),
  id: Joi.number().required(),
  userId: Joi.number().required()
});

module.exports = {
  createAccountSchema,
  updateUserSchema
}
