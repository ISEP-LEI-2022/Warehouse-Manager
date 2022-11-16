import ValueObject from "../interfaces/ValueObject";
import { businessRuleErrorFactory } from "../../utils/Err";
import { isValidRegistration } from "../../utils/UtilityFunctions";

export default class Registration implements ValueObject<string> {
    private registration = "";

    /**
     * Creates a value object that identifies the truck
     */
    constructor(registration: string) {
    const error = businessRuleErrorFactory();

    isValidRegistration(registration)
    ? (this.registration = registration)
    : error.addError("Invalid identifier");
    if (error.hasErrors()) throw error;
    }

    /**
     * @returns {string} the registration
     */
    value(): string {
    return this.registration;
    }

    equals(o: ValueObject<string>): boolean {
    if (this === o) {
    return true;
    }
    if (!(o instanceof Registration)) {
    return false;
    }

    return this.registration === o.registration;
    }
}
