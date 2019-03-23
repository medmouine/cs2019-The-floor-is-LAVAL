import {ServiceException} from "../../ServiceException";
import {HttpStatus} from "../../../interfaces/http/HttpStatus";

export class EmailDoesNotExistError extends ServiceException {
  public type: typeof EmailDoesNotExistError = EmailDoesNotExistError;

  constructor(email: string) {
    super(`Account with email : ${email} does not exist`, HttpStatus.NOT_FOUND);
  }
}
