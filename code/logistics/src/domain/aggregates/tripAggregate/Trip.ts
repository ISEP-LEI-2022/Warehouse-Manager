import Entity from "../../Entity";
import {
  Registration,
  TripIdentifier,
  DateTrip,
  DeliveryIdentifier,
} from "../../value-objects";
import AggregateRoot from "../AggregateRoot";
import SliceRoute from "./SliceRoute";

export default class Trip implements AggregateRoot<string> {
  private idTrip: TripIdentifier;
  private registrationProp: Registration;
  private dateTripProp: DateTrip;
  private routesProp: SliceRoute[];
  private deliveriesProp: DeliveryIdentifier[];

  constructor(
    idTrip: string,
    registration: string,
    dateTrip: string,
    routes: SliceRouteType[],
    deliveries: string[]
  ) {
    try {
      this.idTrip = new TripIdentifier(idTrip);
      this.registrationProp = new Registration(registration);
      this.dateTripProp = new DateTrip(dateTrip);
      this.routesProp = routes.map(
        (route) => new SliceRoute(route.idStart, route.idEnd)
      );
      this.deliveriesProp = deliveries.map(
        (delivery) => new DeliveryIdentifier(delivery)
      );
    } catch (err) {
      throw err;
    }
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

export type SliceRouteType = {
  idStart: string;
  idEnd: string;
};
