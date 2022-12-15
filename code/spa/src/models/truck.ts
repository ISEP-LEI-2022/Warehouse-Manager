export default class Truck {
  Registration: string;
  Capacity: number;
  Autonomy: number;
  Tare: number;

  constructor(json: any) {
    this.Registration = json.registration;
    this.Capacity = json.capacity;
    this.Autonomy = json.autonomy;
    this.Tare = json.tare;
  }
}
