import AccountService from "./application/account/AccountService";

import {Container} from 'inversify';
import TYPES from "./context/types";
import {HealthCheckService} from "./application/healtcheck/HealthCheckService";
import {HealthCheckProvider} from "./domain/healthcheck/HealthCheckProvider";
import {MongoDBClient} from "./infrastructure/mongo/MongoClient";
import {MongoArticleRepository} from "./infrastructure/article/MongoArticleRepository";
import {ArticleService} from "./application/article/ArticleService";
import {ArticleAssembler} from "./application/article/assembler/ArticleAssembler";
import AccountSanitizer from "./application/account/sanitizer/AccountSanitizer";
import {AccountRepository} from "./domain/account/persistence/AccountRepository";
import {AccountFactory} from "./application/account/AccountFactory";
import {AccountRequestValidator} from "./application/account/requests/validator/AccountRequestValidator";
import {MongoAccountRepository} from "./infrastructure/account/MongoAccountRepository";
import {ArticleRepository} from "./domain/article/ArticleRepository";


export default function (container: Container): void {
  container.bind<HealthCheckService>(TYPES.HealthCheckService).to(HealthCheckService);
  container.bind<HealthCheckProvider>(TYPES.HealthCheckProvider).to(HealthCheckProvider);

  container.bind<MongoDBClient>(TYPES.MongoDBClient).to(MongoDBClient);

  container.bind<ArticleRepository>(TYPES.ArticleRepository).to(MongoArticleRepository);
  container.bind<ArticleAssembler>(TYPES.ArticleAssembler).to(ArticleAssembler);
  container.bind<ArticleService>(TYPES.ArticleService).to(ArticleService);

  container.bind<AccountService>(TYPES.AccountService).to(AccountService);
  container.bind<AccountSanitizer>(TYPES.AccountSanitizer).to(AccountSanitizer);
  container.bind<AccountRepository>(TYPES.AccountRepository).to(MongoAccountRepository);
  container.bind<AccountFactory>(TYPES.AccountFactory).to(AccountFactory)
  container.bind<AccountRequestValidator>(TYPES.AccountRequestValidator).to(AccountRequestValidator);
}

