import {Container} from 'inversify';
import TYPES from "./context/types";
import {HealthCheckService} from "./application/healtcheck/HealthCheckService";
import {HealthCheckProvider} from "./domain/healthcheck/HealthCheckProvider";
import {MongoDBClient} from "./infrastructure/mongo/MongoClient";


export default function (container: Container): void {
  container.bind<HealthCheckService>(TYPES.HealthCheckService).to(HealthCheckService);
  container.bind<HealthCheckProvider>(TYPES.HealthCheckProvider).to(HealthCheckProvider);

  container.bind<MongoDBClient>(TYPES.MongoDBClient).to(MongoDBClient);
}

