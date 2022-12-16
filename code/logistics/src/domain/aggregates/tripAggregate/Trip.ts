import Entity from "src/domain/Entity";
import { businessRuleErrorFactory } from "../../utils/Err";
import {
  Registration,
  RouteIdentifier,
  TripIdentifier,
  DateTrip,
  DeliveryIdentifier
} from "../../value-objects";
import AggregateRoot from "../AggregateRoot";

export default class Trip implements AggregateRoot<string> {
  private idTrip: TripIdentifier;
  private registrationProp: Registration;
  private dateTripProp: DateTrip;
  private routesProp: RouteIdentifier[];
  private deliveriesProp: DeliveryIdentifier[];

  constructor(
    idTrip: string,
    registration: string,
    dateTrip: string,
    routes: string[],
    deliveries: string[]
  ) {
    const error = businessRuleErrorFactory();
    try {
        this.idTrip = new TripIdentifier(idTrip);
        this.registrationProp = new Registration(registration);
        this.dateTripProp = new DateTrip(dateTrip);
        this.routesProp = routes.map(route => new RouteIdentifier(route));
        this.deliveriesProp = deliveries.map(delivery => new DeliveryIdentifier(delivery));
    }catch(err){
        error.addError(err as string);
    }
    if (error.hasErrors()) throw error;
  }

  get identifier() {
    return this.idTrip;
  }

  sameAs(ent2: Entity<string>): boolean {
      return this.idTrip.equals(ent2.identifier);
  }

  get registration() {
    return this.registrationProp;
  }

  get dateTrip() {
    return this.dateTripProp;
  }

  get routes() {
    return this.routesProp;
  }

  get deliveries() {
    return this.deliveriesProp;
  }

}
