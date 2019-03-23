const TYPES = {
  HealthCheckService: Symbol.for("HealthCheckService"),
  HealthCheckProvider: Symbol.for("HealthCheckProvider"),

  ArticleRepository: Symbol.for("ArticleRepository"),
  ArticleService: Symbol.for("ArticleService"),
  ArticleAssembler: Symbol.for("ArticleAssembler"),
  MongoDBClient: Symbol.for('MongoDBClient'),
};

export default TYPES;
