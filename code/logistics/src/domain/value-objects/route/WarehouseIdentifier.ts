import EntityIdentifier from "../interfaces/EntityIdentifier";
import { businessRuleErrorFactory } from "../../utils/Err";
import { isValidStringIdentifier } from "../../utils/UtilityFunctions";

export default class WarehouseIdentifier implements EntityIdentifier<string> {
  private identifier: string = "";

  constructor(identifier: string) {
    const error = businessRuleErrorFactory();

    isValidStringIdentifier(identifier)
      ? (this.identifier = identifier)
      : error.addError("Invalid identifier");
    if (error.hasErrors()) throw error;
  }

  /**
   * @returns {string} the identifier
   */
  value(): string {
    return this.identifier;
  }

  equals(o: EntityIdentifier<string>): boolean {
    if (this === o) {
      return true;
    }
    if (!(o instanceof WarehouseIdentifier)) {
      return false;
    }

    return this.identifier === o.identifier;
  }
}
