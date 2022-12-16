import { businessRuleErrorFactory } from "../../utils/Err";
import { isValidRegistration } from "../../utils/UtilityFunctions";
import EntityIdentifier from "../interfaces/EntityIdentifier";

export default class Registration implements EntityIdentifier<string> {
    private registration = "";

    /**
     * Creates a value object that identifies the truck
     */
    constructor(registration: string) {
    const error = businessRuleErrorFactory();

    isValidRegistration(registration)
    ? (this.registration = registration)
    : error.addError("Invalid Registration");
    if (error.hasErrors()) throw error;
    }

    /**
     * @returns {string} the registration
     */
    value(): string {
    return this.registration;
    }

    equals(o: EntityIdentifier<string>): boolean {
    if (this === o) {
    return true;
    }
    if (!(o instanceof Registration)) {
    return false;
    }

    return this.registration === o.registration;
    }
}
