import ValueObject from "./interfaces/ValueObject";
import { businessRuleErrorFactory } from "../utils/Err";
import { isValidNumber } from "../utils/UtilityFunctions";

export default class Duration implements ValueObject<number> {
  private duration: number = 0;

  constructor(duration: number) {
    const error = businessRuleErrorFactory();

    isValidNumber(duration)
      ? (this.duration = duration)
      : error.addError("Invalid duration");
    if (error.hasErrors()) throw error;
  }

  value(): number {
    return this.duration;
  }

  equals(o: ValueObject<number>): boolean {
    if (this === o) {
      return true;
    }
    if (!(o instanceof Duration)) {
      return false;
    }

    return this.duration === o.duration;
  }
}


