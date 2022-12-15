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
      this.Distance = 0;
      this.TimeRequired = 0;
      this.EnergyConsumed = 0;
      this.ExtraChargingTime = 0;
    }
  }

  toJSON(): any {
    return {
      idRoute: this.Route,
      extraChargingTime: this.ExtraChargingTime,
      energyConsumed: this.EnergyConsumed,
      timeRequired: this.TimeRequired,
      distance: this.Distance,
      idEnd: this.End,
      idStart: this.Start,
    };
  }
}
