export class AccountAlreadyExistsError extends Error {
  private type: typeof AccountAlreadyExistsError = AccountAlreadyExistsError;

  constructor(email: string) {
    super(`Account with email : ${email} already exists`);
  }
}
