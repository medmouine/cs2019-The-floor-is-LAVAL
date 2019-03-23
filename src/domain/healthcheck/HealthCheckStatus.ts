export class HealthCheckStatus {
  public static readonly STATUS_UP: string = "Up";
  private status: string;

  constructor() {
    this.status = HealthCheckStatus.STATUS_UP;
  }
}
