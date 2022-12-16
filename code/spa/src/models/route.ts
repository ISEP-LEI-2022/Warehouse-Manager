export default class route {
  Route: string;
  Start: string;
  End: string;
  Distance: number;
  TimeRequired: number;
  EnergyConsumed: number;
  ExtraChargingTime: number;

  constructor(json: any = null) {
    if (json) {
      this.Route = json.idRoute;
      this.Start = json.idStart;
      this.End = json.idEnd;
      this.Distance = json.distance;
      this.TimeRequired = json.timeRequired;
      this.EnergyConsumed = json.energyConsumed;
      this.ExtraChargingTime = json.extraChargingTime;
    } else {
      this.Route = "";
      this.Start = "";
      this.End = "";
      this.Distance = 1;
      this.TimeRequired = 1;
      this.EnergyConsumed = 1;
      this.ExtraChargingTime = 1;
    }
  }

  toJSON(): any {
    return {
      idRoute: this.Route,
      extraChargingTime: Number(this.ExtraChargingTime),
      energyConsumed: Number(this.EnergyConsumed),
      timeRequired: Number(this.TimeRequired),
      distance: Number(this.Distance),
      idEnd: this.End,
      idStart: this.Start,
    };
  }
}
