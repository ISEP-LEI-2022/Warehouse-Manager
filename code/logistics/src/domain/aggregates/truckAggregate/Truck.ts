import AggregateRoot from "../AggregateRoot";
import {
Autonomy,
Capacity,
Registration,
Tare,
} from "../../value-objects";
import { businessRuleErrorFactory } from "../../utils/Err";
import Entity from "../../Entity";

export default class Truck implements AggregateRoot<string> {
private autonomyProp: Autonomy;
private capacityProp: Capacity;
private registrationProp: Registration;
private tareProp: Tare;

constructor(
    autonomy: number,
    capacity: number,
    registration: string,
    tare: number,
) {
const error = businessRuleErrorFactory();
try {
    this.autonomyProp = new Autonomy(autonomy);
    this.capacityProp = new Capacity(capacity);
    this.registrationProp = new Registration(registration);
    this.tareProp = new Tare(tare);
} catch (err) {
    error.addError(err as string);
}
if (error.hasErrors()) throw error;
}

get identifier() {
return this.registrationProp;
}

sameAs(ent2: Entity<string>): boolean {
return this.registrationProp.equals(ent2.identifier);
}

get registration() {
    return this.registrationProp;
    }

get autonomy() {
return this.autonomyProp;
}

get capacity() {
return this.capacityProp;
}

get tare() {
return this.tareProp;
}

}
