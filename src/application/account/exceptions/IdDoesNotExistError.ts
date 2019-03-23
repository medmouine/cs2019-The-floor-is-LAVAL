import {ServiceException} from "../../ServiceException";
import {HttpStatus} from "../../../interfaces/http/HttpStatus";

export class IdDoesNotExistError extends ServiceException {
  constructor(id: string) {
    super(`Account with id : ${id} does not exist`, HttpStatus.NOT_FOUND);
  }
}
