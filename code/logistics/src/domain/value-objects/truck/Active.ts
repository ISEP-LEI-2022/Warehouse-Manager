import ValueObject from "../interfaces/ValueObject";

export default class Active implements ValueObject<boolean> {
  private active = false;

  constructor(active: boolean) {
    this.active = active;
  }

  value(): boolean {
    return this.active;
  }
  equals(o: ValueObject<boolean>): boolean {
    if (this === o) {
      return true;
    }
    if (!(o instanceof Active)) {
      return false;
    }

    return this.active === o.active;
  }
}
