import * as Joi from 'joi';

export interface Credentials {
  email: string;
  password: string;
}

export const CredentialsSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
