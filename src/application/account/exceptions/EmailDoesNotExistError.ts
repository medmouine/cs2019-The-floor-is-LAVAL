export class EmailDoesNotExistError extends Error {
  public type: typeof EmailDoesNotExistError = EmailDoesNotExistError;

  constructor(email: string) {
    super(`Account with email : ${email} does not exist`);
  }
}
