export class InvalidPasswordError extends Error {
  public type: typeof InvalidPasswordError = InvalidPasswordError;

  constructor() {
    super('Password must be valid');
  }
}
