const TYPES = {
  HealthCheckService: Symbol.for("HealthCheckService"),
  HealthCheckProvider: Symbol.for("HealthCheckProvider"),

  ArticleRepository: Symbol.for("ArticleRepository"),
  ArticleService: Symbol.for("ArticleService"),
  ArticleAssembler: Symbol.for("ArticleAssembler"),

  MongoDBClient: Symbol.for('MongoDBClient'),

  AccountService: Symbol.for('AccountService'),
  AccountSanitizer: Symbol.for('AccountSanitizer'),
  AccountRepository: Symbol.for('MockAccountRepository'),
  AccountFactory: Symbol.for('AccountFactory'),
  AccountRequestValidator: Symbol.for('AccountRequestValidator'),
};

export default TYPES;
