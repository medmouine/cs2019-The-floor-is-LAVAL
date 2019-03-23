import {Container} from 'inversify';
import TYPE from "./context/types";
import {HealthCheckService} from "./application/healtcheck/HealthCheckService";
import {HealthCheckProvider} from "./domain/healthcheck/HealthCheckProvider";

export default function (container: Container): void {
  container.bind<HealthCheckService>(TYPE.HealthCheckService).to(HealthCheckService);
  container.bind<HealthCheckProvider>(TYPE.HealthCheckProvider).to(HealthCheckProvider);
}
