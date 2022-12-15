export default class route {
  Route: string;
  Start: string;
  End: string;
  Distance: number;
  TimeRequired: number;
  EnergyConsumed: number;
  ExtraChargingTime: number;

  constructor(json: any) {
    this.Route = json.idRoute;
    this.Start = json.idStart;
    this.End = json.idEnd;
    this.Distance = json.distance;
    this.TimeRequired = json.timeRequired;
    this.EnergyConsumed = json.energyConsumed;
    this.ExtraChargingTime = json.extraChargingTime;
  }
}
