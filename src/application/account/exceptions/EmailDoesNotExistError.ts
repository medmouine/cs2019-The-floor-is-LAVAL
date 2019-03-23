export class EmailDoesNotExistError extends Error {
  constructor(email: string) {
    super(`Account with email : ${email} does not exist`);
  }
}
