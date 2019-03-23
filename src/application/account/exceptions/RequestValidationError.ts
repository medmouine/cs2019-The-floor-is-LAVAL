export class RequestValidationError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}
