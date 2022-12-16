export default class Truck {
  Registration: string;
  Capacity: number;
  Autonomy: number;
  Tare: number;

  constructor(registration: string, capacity: number, autonomy: number, tare: number) {
    this.Registration = registration;
    this.Capacity = capacity;
    this.Autonomy = autonomy;
    this.Tare = tare;
  }

}
