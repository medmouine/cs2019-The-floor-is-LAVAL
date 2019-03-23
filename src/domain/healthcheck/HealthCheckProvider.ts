import {HealthCheckStatus} from "./HealthCheckStatus";
import {injectable} from "inversify";

@injectable()
export class HealthCheckProvider {
  public getHealthStatus(): HealthCheckStatus {
    return new HealthCheckStatus();
  }
}
