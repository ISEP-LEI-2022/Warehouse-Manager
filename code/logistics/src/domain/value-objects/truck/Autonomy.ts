import ValueObject from "../interfaces/ValueObject";
import { businessRuleErrorFactory } from "../../utils/Err";
import { isValidNumber } from "../../utils/UtilityFunctions";

export default class Autonomy implements ValueObject<number> {
private autonomy: number = 0;

constructor(autonomy: number) {
const error = businessRuleErrorFactory();

isValidNumber(autonomy)
    ? (this.autonomy = autonomy)
    : error.addError("Invalid autonomy");
if (error.hasErrors()) throw error;
}

value(): number {
return this.autonomy;
}

equals(o: ValueObject<number>): boolean {
if (this === o) {
    return true;
}
if (!(o instanceof Autonomy)) {
    return false;
}

return this.autonomy === o.autonomy;
}
}