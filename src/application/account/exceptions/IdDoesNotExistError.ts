export class IdDoesNotExistError extends Error {
  constructor(id: string) {
    super(`Account with id : ${id} does not exist`);
  }
}
