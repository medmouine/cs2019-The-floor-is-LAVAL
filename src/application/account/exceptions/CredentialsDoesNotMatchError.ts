export class CredentialsDoesNotMatchError extends Error {
  public type: typeof CredentialsDoesNotMatchError = CredentialsDoesNotMatchError;
  constructor() {
    super('Email or password invalid');
  }
}
