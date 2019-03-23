import {AccountCreationRequest, AccountCreationRequestSchema} from "../AccountCreationRequest";
import {RequestValidationError} from "../../exceptions/RequestValidationError";
import * as Joi from 'joi';

export class RequestValidator {
  public static validateAccountCreationRequest(accountCreationRequest: AccountCreationRequest) {
    Joi.validate(accountCreationRequest, AccountCreationRequestSchema, { allowUnknown: true }, ((err, value) => {
      if (!!err) throw new RequestValidationError(err.details[0].message);
    }));
  }
}
