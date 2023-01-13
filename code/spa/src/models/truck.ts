export default class Truck {
  Registration: string;
  Capacity: number;
  Autonomy: number;
  Tare: number;
  Active: boolean = true;

  constructor(registration: string, capacity: number, autonomy: number, tare: number, active: boolean) {
    this.Registration = registration;
    this.Capacity = capacity;
    this.Autonomy = autonomy;
    this.Tare = tare;
    this.Active = active;
  }

}
