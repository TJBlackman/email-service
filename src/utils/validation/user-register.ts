import Joi from 'joi';

interface RegisterValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = Joi.object<RegisterValues>({
  firstName: Joi.string().min(2).max(100).required(),
  lastName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(3).max(256).required(),
  confirmPassword: Joi.any().equal(Joi.ref('password'))
});

export const validateRegisterValues = (value: RegisterValues) => {
  return schema.validate(value);
}; 