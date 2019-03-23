export class InvalidPasswordError extends Error {
  constructor() {
    super('Password must be valid');
  }
}
