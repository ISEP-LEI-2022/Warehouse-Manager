import AggregateRoot from "../AggregateRoot";
import { Autonomy, Capacity, Registration, Tare } from "../../value-objects";
import Entity from "../../Entity";

export default class Truck implements AggregateRoot<string> {
  private autonomyProp: Autonomy;
  private capacityProp: Capacity;
  private registrationProp: Registration;
  private tareProp: Tare;

  constructor(
    autonomy: number,
    capacity: number,
    registration: string,
    tare: number
  ) {
    try {
      this.autonomyProp = new Autonomy(autonomy);
      this.capacityProp = new Capacity(capacity);
      this.registrationProp = new Registration(registration);
      this.tareProp = new Tare(tare);
    } catch (err) {
      throw err;
    }
  }

  get identifier() {
    return this.registrationProp;
  }

  sameAs(ent2: Entity<string>): boolean {
    return this.registrationProp.equals(ent2.identifier);
  }

  get registration() {
    return this.registrationProp;
  }

  get autonomy() {
    return this.autonomyProp;
  }

  get capacity() {
    return this.capacityProp;
  }

  get tare() {
    return this.tareProp;
  }
}
