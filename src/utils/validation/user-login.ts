import Joi from 'joi';

const schema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(3).max(256).required()
});

export const validateLoginValues = (value: { email: string; password: string; }) => {
  return schema.validate(value);
}; 