import ValueObject from "../interfaces/ValueObject";
import { businessRuleErrorFactory } from "../../utils/Err";
import { isValidNumber } from "../../utils/UtilityFunctions";

export default class Capacity implements ValueObject<number> {
    private capacity = 0;

    constructor(capacity: number) {
    const error = businessRuleErrorFactory();

    isValidNumber(capacity)
        ? (this.capacity = capacity)
        : error.addError("Invalid capacity");
    if (error.hasErrors()) throw error;
    }

    value(): number {
    return this.capacity;
    }

    equals(o: ValueObject<number>): boolean {
    if (this === o) {
        return true;
    }
    if (!(o instanceof Capacity)) {
        return false;
    }

    return this.capacity === o.capacity;
    }
}