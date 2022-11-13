import { businessRuleErrorFactory } from "../../utils/Err";
import ValueObject from "../interfaces/ValueObject";

export default class Energy implements ValueObject<number> {
  private energy: number = 0;

  constructor(energy: number) {
    const error = businessRuleErrorFactory();

    isValidNumber(energy)
      ? (this.energy = energy)
      : error.addError("Invalid energy");
    if (error.hasErrors()) throw error;
  }

  value(): number {
    return this.energy;
  }

  equals(o: ValueObject<number>): boolean {
    if (this === o) {
      return true;
    }
    if (!(o instanceof Energy)) {
      return false;
    }

    return this.energy === o.energy;
  }
}


/**
 * Function validates if the number is valid
 * @param {number} number
 * @returns {boolean} true if valid, false otherwise
 */
export function isValidNumber(number: number): boolean {
  return (
    number !== undefined &&
    number !== null &&
    typeof number === "number" &&
    number >= 0
  );
}
