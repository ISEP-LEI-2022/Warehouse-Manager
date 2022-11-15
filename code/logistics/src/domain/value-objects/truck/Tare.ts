import ValueObject from "../interfaces/ValueObject";
import { businessRuleErrorFactory } from "../../utils/Err";
import { isValidNumber } from "../../utils/UtilityFunctions";

export default class Tare implements ValueObject<number> {
    private tare = 0;

    constructor(tare: number) {
    const error = businessRuleErrorFactory();

    isValidNumber(tare)
        ? (this.tare = tare)
        : error.addError("Invalid distance");
    if (error.hasErrors()) throw error;
    }

    value(): number {
    return this.tare;
    }

    equals(o: ValueObject<number>): boolean {
    if (this === o) {
        return true;
    }
    if (!(o instanceof Tare)) {
        return false;
    }

    return this.tare === o.tare;
    }
}