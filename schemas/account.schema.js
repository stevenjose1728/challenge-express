const Joi = require('joi');

const createAccountSchema = Joi.object({
  created_at: Joi.optional(),
  deleted_at: Joi.optional().allow(null),
  name: Joi.string().required(),
  responsableId: Joi.number().required(),
  teamConsultation: Joi.string().required(),
  updated_at: Joi.optional(),
  userId: Joi.number().required()
});

module.exports = {
  createAccountSchema
}
