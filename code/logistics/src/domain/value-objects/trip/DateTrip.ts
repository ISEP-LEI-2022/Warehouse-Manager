import { businessRuleErrorFactory } from "../../utils/Err";
import { isValidDate } from "../../utils/UtilityFunctions";
import ValueObject from "../interfaces/ValueObject";

export default class DateTrip implements ValueObject<string> {
    private dateTrip = "1900/01/01";
  
    constructor(dateTrip: string) {
      const error = businessRuleErrorFactory();
  
      isValidDate(dateTrip)
        ? (this.dateTrip = dateTrip)
        : error.addError("Invalid date - must be in one of the following formats: yyyy-mm-dd, dd-mm-yyyy, yyyy/mm/dd, dd/mm/yyyy");
      if (error.hasErrors()) throw error;
    }
  
    value(): string {
      return this.dateTrip;
    }
  
    equals(o: ValueObject<string>): boolean {
      if (this === o) {
        return true;
      }
      if (!(o instanceof DateTrip)) {
        return false;
      }
  
      return this.dateTrip === o.dateTrip;
    }
  }
  
  