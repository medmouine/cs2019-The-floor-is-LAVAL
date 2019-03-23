import {ServiceException} from "../../ServiceException";
import {HttpStatus} from "../../../interfaces/http/HttpStatus";

export class RequestValidationError extends ServiceException {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}
