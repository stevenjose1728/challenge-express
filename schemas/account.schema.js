const Joi = require('joi');

const createAccountSchema = Joi.object({
  createdAt: Joi.optional(),
  deletedAt: Joi.optional().allow(null),
  name: Joi.string().required(),
  responsableId: Joi.number().required(),
  teamConsultation: Joi.string().required(),
  updatedAt: Joi.optional(),
  id: Joi.number().optional(),
  userId: Joi.number().required()
});

module.exports = {
  createAccountSchema
}
