import { isValidDate } from "../../utils/UtilityFunctions";
import { businessRuleErrorFactory } from "../../utils/Err";

export default class DateTrip {
    private dateTrip = new Date("2000/01/01");
  
    constructor(dateTrip: Date) {
      const error = businessRuleErrorFactory();
      const dateWithoutTime = new Date(new Date(dateTrip).toLocaleDateString());
      isValidDate(dateTrip)
        ? (this.dateTrip = dateWithoutTime)
        : error.addError("Invalid date - format needs to be YYYY/MM/DD | YYYY-MM-DD | MM/DD/YYYY | MM-DD-YYYY");
      if (error.hasErrors()) throw error;
    }
  
    value(): Date {
      return this.dateTrip;
    }
  }
  
  