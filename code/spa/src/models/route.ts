export default class route {
  Route: string;
  Start: string;
  End: string;
  Distance: number;
  TimeRequired: number;
  EnergyConsumed: number;
  ExtraChargingTime: number;

  constructor(route: string, start: string, end: string, distance:number, timeRequired:number, energyConsumed: number, extraChargingTime: number) {
    this.Route = route;
    this.Start = start;
    this.End = end;
    this.Distance = distance;
    this.TimeRequired = timeRequired;
    this.EnergyConsumed = energyConsumed;
    this.ExtraChargingTime = extraChargingTime;
  }

}
