import * as Joi from 'joi';

export interface AccountCreationRequest {
  email: string;
  password: string;
  fullName: string;
}

export const AccountCreationRequestSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  fullName: Joi.string().required(),
});
