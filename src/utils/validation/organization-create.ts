import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().min(3).max(256).required(),
  sendGridAPIKeys: Joi.array().items(Joi.string())
});

export const validateCreateOrganizationValues = (value: { email: string; password: string; }) => {
  return schema.validateAsync(value);
}; 