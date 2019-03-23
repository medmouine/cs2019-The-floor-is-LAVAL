import {controller, httpGet} from "inversify-express-utils";
import {HealthCheckStatus} from "../../../domain/healthcheck/HealthCheckStatus";
import {HealthCheckService} from "../../../application/healtcheck/HealthCheckService";
import {inject} from "inversify";
import TYPES from "../../../context/types";

export const BASE_STATUS_URL: string = '/status';

@controller(BASE_STATUS_URL)
export class HealthCheckController {
  private readonly healthCheckService: HealthCheckService;

  constructor(@inject(TYPES.HealthCheckService) healthCheckService: HealthCheckService) {
    this.healthCheckService = healthCheckService;
  }

  @httpGet('/')
  public async getStatus(): Promise<HealthCheckStatus> {
    return this.healthCheckService.getHealthStatus();
  }
}
