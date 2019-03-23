import {AccountCreationRequest, AccountCreationRequestSchema} from "../AccountCreationRequest";
import {RequestValidationError} from "../../exceptions/RequestValidationError";
import * as Joi from 'joi';
import {injectable} from "inversify";

@injectable()
export class AccountRequestValidator {
  public validateAccountCreationRequest(accountCreationRequest: AccountCreationRequest) {
    Joi.validate(accountCreationRequest, AccountCreationRequestSchema, { allowUnknown: true }, ((err, value) => {
      if (!!err) throw new RequestValidationError(err.details[0].message);
    }));
  }
}
