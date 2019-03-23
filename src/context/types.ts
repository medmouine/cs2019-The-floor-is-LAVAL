const TYPES = {
  MongoDBClient: Symbol.for('MongoDBClient'),

  AccountService: Symbol.for('AccountService'),
  AccountSanitizer: Symbol.for('AccountSanitizer'),
  AccountRepository: Symbol.for('MockAccountRepository'),
  AccountFactory: Symbol.for('AccountFactory'),
  AccountRequestValidator: Symbol.for('AccountRequestValidator'),

  HealthCheckService: Symbol.for("HealthCheckService"),
  HealthCheckProvider: Symbol.for("HealthCheckProvider")
};

export default TYPES;
