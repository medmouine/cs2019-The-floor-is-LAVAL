import {Container} from 'inversify';
import TYPES from "./context/types";
import {HealthCheckService} from "./application/healtcheck/HealthCheckService";
import {HealthCheckProvider} from "./domain/healthcheck/HealthCheckProvider";
import {MongoDBClient} from "./infrastructure/mongo/MongoClient";
import {MongoArticleRepository} from "./infrastructure/article/MongoArticleRepository";
import {ArticleService} from "./application/article/ArticleService";
import {ArticleAssembler} from "./application/article/assembler/ArticleAssembler";


export default function (container: Container): void {
  container.bind<HealthCheckService>(TYPES.HealthCheckService).to(HealthCheckService);
  container.bind<HealthCheckProvider>(TYPES.HealthCheckProvider).to(HealthCheckProvider);

  container.bind<MongoDBClient>(TYPES.MongoDBClient).to(MongoDBClient);

  // @ts-ignore
  container.bind<MongoDBClient>(TYPES.ArticleRepository).to(MongoArticleRepository);
  // @ts-ignore
  container.bind<MongoDBClient>(TYPES.ArticleAssembler).to(ArticleAssembler);
  // @ts-ignore
  container.bind<MongoDBClient>(TYPES.ArticleService).to(ArticleService);
}

