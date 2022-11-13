import ValueObject from "./interfaces/ValueObject";
import { businessRuleErrorFactory } from "../utils/Err";
import { isValidNumber } from "../utils/UtilityFunctions";

export default class Distance implements ValueObject<number> {
  private distance: number = 0;

  constructor(distance: number) {
    const error = businessRuleErrorFactory();

    isValidNumber(distance)
      ? (this.distance = distance)
      : error.addError("Invalid distance");
    if (error.hasErrors()) throw error;
  }

  value(): number {
    return this.distance;
  }

  equals(o: ValueObject<number>): boolean {
    if (this === o) {
      return true;
    }
    if (!(o instanceof Distance)) {
      return false;
    }

    return this.distance === o.distance;
  }
}