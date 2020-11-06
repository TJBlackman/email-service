import Joi from 'joi';
import { IProviderCredentials, IOrganizationBase } from "../../types";

const emailProviderSchema = Joi.object({
  providerName: Joi.string().min(3).max(256).required(),
  providerAPIKey: Joi.string().min(3).max(2048).required(),
  providerEmail: Joi.string().min(3).max(256).allow('').email({ tlds: { allow: false } }).optional(),
  providerPassword: Joi.string().min(3).max(256).allow('').optional(),
});

const schema = Joi.object({
  name: Joi.string().min(3).max(256).required(),
  description: Joi.string().min(3).max(2048).required(),
  providerCredentials: Joi.array().items(emailProviderSchema)
});

export const validateNewEmailProviderCredentials = (value: IProviderCredentials) => emailProviderSchema.validate(value);

export const validateNewOrganization = (value: Omit<IOrganizationBase, 'apiKey' | 'owner'>): Promise<Omit<IOrganizationBase, 'apiKey' | 'owner'>> => {
  return schema.validateAsync(value);
}; 