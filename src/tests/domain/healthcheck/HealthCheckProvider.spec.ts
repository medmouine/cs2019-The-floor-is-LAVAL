import {HealthCheckProvider} from "../../../domain/healthcheck/HealthCheckProvider";
import {HealthCheckStatus} from "../../../domain/healthcheck/HealthCheckStatus";

let healthCheckProvider: HealthCheckProvider;

beforeEach(() => {
  healthCheckProvider = new HealthCheckProvider();
});

describe('When getting the status', () => {
  it('should return that the status is up', () => {
    const expectedStatus = new HealthCheckStatus();

    expect(healthCheckProvider.getStatus()).toEqual(expectedStatus);
  });
});
