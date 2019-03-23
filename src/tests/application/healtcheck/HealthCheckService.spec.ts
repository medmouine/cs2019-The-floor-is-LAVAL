import "reflect-metadata";
import {HealthCheckService} from "../../../application/healtcheck/HealthCheckService";
import {HealthCheckProvider} from "../../../domain/healthcheck/HealthCheckProvider";
import createMockInstance from "jest-create-mock-instance";
import {HealthCheckStatus} from "../../../domain/healthcheck/HealthCheckStatus";

let healthCheckService: HealthCheckService;
let healthCheckProvider: HealthCheckProvider;

beforeEach(() => {
  healthCheckProvider = createMockInstance(HealthCheckProvider);
  healthCheckService = new HealthCheckService(healthCheckProvider);
});

describe('When getting the status', () => {
  let healthCheckStatus: HealthCheckStatus;
  beforeEach(() => {
    healthCheckStatus = createMockInstance(HealthCheckStatus);

    // @ts-ignore
    healthCheckProvider.getHealthStatus.mockReturnValue(healthCheckStatus);
  });

  it('should return the right status', () => {
    expect(healthCheckService.getHealthStatus()).toBe(healthCheckStatus);
  })
});
