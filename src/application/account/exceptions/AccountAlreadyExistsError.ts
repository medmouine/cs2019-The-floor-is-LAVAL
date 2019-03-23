export class AccountAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`Account with email : ${email} already exists`);
  }
}
