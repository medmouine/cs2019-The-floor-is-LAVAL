import {HttpStatus} from "../interfaces/http/HttpStatus";

export class ServiceException extends Error {
  public type: typeof ServiceException = ServiceException;
  public readonly status: HttpStatus;


  constructor(message: string, status: HttpStatus) {
    super(message);
    this.status = status;
  }
}
