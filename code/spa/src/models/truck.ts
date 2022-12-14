export default class Truck {
  registration: string;
  capacity: number;
  autonomy: number;
  tare: number;

  constructor(
    registration: string,
    capacity: number,
    autonomy: number,
    tare: number
  ) {
    this.registration = registration;
    this.capacity = capacity;
    this.autonomy = autonomy;
    this.tare = tare;
  }
}
