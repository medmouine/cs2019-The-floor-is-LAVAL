export class CredentialsDoesNotMatchError extends Error {
  constructor() {
    super('Email or password invalid');
  }
}
