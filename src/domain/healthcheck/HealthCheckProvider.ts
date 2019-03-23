import {HealthCheckStatus} from "./HealthCheckStatus";

export class HealthCheckProvider {
  public getStatus(): HealthCheckStatus {
    return new HealthCheckStatus();
  }
}
