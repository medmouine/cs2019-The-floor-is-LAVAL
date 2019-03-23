import {ServiceException} from "../../ServiceException";
import {HttpStatus} from "../../../interfaces/http/HttpStatus";

export class CredentialsDoesNotMatchError extends ServiceException {
  public type: typeof CredentialsDoesNotMatchError = CredentialsDoesNotMatchError;

  constructor() {
    super('Email or password invalid', HttpStatus.BAD_REQUEST);
  }
}
