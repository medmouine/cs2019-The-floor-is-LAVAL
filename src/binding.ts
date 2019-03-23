import AccountService from "./application/account/AccountService";

import {Container} from 'inversify';
import TYPES from "./context/types";
import {HealthCheckService} from "./application/healtcheck/HealthCheckService";
import {HealthCheckProvider} from "./domain/healthcheck/HealthCheckProvider";
import {MongoDBClient} from "./infrastructure/mongo/MongoClient";
import AccountSanitizer from "./application/account/sanitizer/AccountSanitizer";
import {AccountRepository} from "./domain/account/persistence/AccountRepository";
import {MockAccountRepository} from "./application/account/persistence/repository/MockAccountRepository";
import {AccountFactory} from "./application/account/AccountFactory";


export default function (container: Container): void {
  container.bind<HealthCheckService>(TYPES.HealthCheckService).to(HealthCheckService);
  container.bind<HealthCheckProvider>(TYPES.HealthCheckProvider).to(HealthCheckProvider);

  container.bind<MongoDBClient>(TYPES.MongoDBClient).to(MongoDBClient);

  container.bind<AccountService>(TYPES.AccountService).to(AccountService);
  container.bind<AccountSanitizer>(TYPES.AccountSanitizer).to(AccountSanitizer);
  container.bind<AccountRepository>(TYPES.AccountRepository).to(MockAccountRepository);
  container.bind<AccountFactory>(TYPES.AccountFactory).to(AccountFactory)
}

