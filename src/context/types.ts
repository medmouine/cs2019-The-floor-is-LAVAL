const TYPES = {
  HealthCheckService: Symbol.for("HealthCheckService"),
  HealthCheckProvider: Symbol.for("HealthCheckProvider"),
  MongoDBClient: Symbol.for('MongoDBClient'),

  AccountService: Symbol.for('AccountService'),
  AccountSanitizer: Symbol.for('AccountSanitizer'),
  AccountRepository: Symbol.for('MockAccountRepository'),
  AccountFactory: Symbol.for('AccountFactory'),
};

export default TYPES;
