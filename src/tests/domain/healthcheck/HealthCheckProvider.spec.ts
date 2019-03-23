import "reflect-metadata";
import {HealthCheckProvider} from "../../../domain/healthcheck/HealthCheckProvider";

let healthCheckProvider: HealthCheckProvider;

beforeEach(() => {
  healthCheckProvider = new HealthCheckProvider();
});

describe('When getting the status', () => {
  it('should return that the status is up', () => {
    const expectedStatus = "Up";

    expect(healthCheckProvider.getHealthStatus().status).toEqual(expectedStatus);
  });
});
