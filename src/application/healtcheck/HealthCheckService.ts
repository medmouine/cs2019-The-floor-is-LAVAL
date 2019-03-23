import {HealthCheckProvider} from "../../domain/healthcheck/HealthCheckProvider";
import {HealthCheckStatus} from "../../domain/healthcheck/HealthCheckStatus";
import {inject, injectable} from "inversify";
import TYPES from "../../context/types";

@injectable()
export class HealthCheckService {
  private readonly healthCheckProvider: HealthCheckProvider;

  constructor(@inject(TYPES.HealthCheckProvider) healthCheckProvider: HealthCheckProvider) {
    this.healthCheckProvider = healthCheckProvider;
  }

  public getHealthStatus(): HealthCheckStatus {
    return this.healthCheckProvider.getHealthStatus();
  }
}
