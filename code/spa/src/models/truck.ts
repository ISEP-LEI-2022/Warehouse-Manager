export default class Truck {
  Registration: string;
  Capacity: number;
  Autonomy: number;
  Tare: number;

  constructor(json: any = null) {
    if (json) {
      this.Registration = json.registration;
      this.Capacity = json.capacity;
      this.Autonomy = json.autonomy;
      this.Tare = json.tare;
    } else {
      this.Registration = "XX-00-XX";
      this.Capacity = 0;
      this.Autonomy = 0;
      this.Tare = 0;
    }
  }

  toJSON() {
    return {
      registration: this.Registration,
      capacity: Number(this.Capacity),
      autonomy: Number(this.Autonomy),
      tare: Number(this.Tare),
    };
  }
}
