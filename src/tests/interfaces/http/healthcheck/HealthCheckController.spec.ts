import "reflect-metadata";
import {HealthCheckController} from "../../../../interfaces/http/healthcheck/HealthCheckController";
import createMockInstance from "jest-create-mock-instance";
import {HealthCheckStatus} from "../../../../domain/healthcheck/HealthCheckStatus";
import {HealthCheckService} from "../../../../application/healtcheck/HealthCheckService";

let healthCheckControllerSpec: HealthCheckController;
let healthCheckService: HealthCheckService;

beforeEach(() => {
  healthCheckService = createMockInstance(HealthCheckService);
  healthCheckControllerSpec = new HealthCheckController(healthCheckService);
});

describe('When getting the status', () => {
  let healthCheckStatus: HealthCheckStatus;
  beforeEach(() => {
    healthCheckStatus = createMockInstance(HealthCheckStatus);
    // @ts-ignore
    healthCheckService.getHealthStatus.mockReturnValue(healthCheckStatus);
  });

  it('should return the right status', async (done) => {
    expect(await healthCheckControllerSpec.getStatus()).toBe(healthCheckStatus);
    done()
  });
});

