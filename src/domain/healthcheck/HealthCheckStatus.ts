export class HealthCheckStatus {
  public static readonly STATUS_UP: string = "Up";
  public readonly status: string;

  constructor() {
    this.status = HealthCheckStatus.STATUS_UP;
  }
}
