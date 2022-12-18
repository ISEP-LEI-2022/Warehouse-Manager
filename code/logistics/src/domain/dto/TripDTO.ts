import { SliceRouteType } from "../aggregates/tripAggregate/Trip";

export default class TripDTO {
    idTrip: string;
    registration: string;
    date: Date;
    routes: SliceRouteType[];
    deliveries: string[];
}