import {ServiceException} from "../../ServiceException";
import {HttpStatus} from "../../../interfaces/http/HttpStatus";

export class AccountAlreadyExistsError extends ServiceException {
  constructor(email: string) {
    super(`Account with email : ${email} already exists`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
