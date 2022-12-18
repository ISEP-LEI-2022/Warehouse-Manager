import { SliceRouteType } from "../aggregates/tripAggregate/Trip";

export default class TripDTO {
    idTrip: string;
    registration: string;
    date: string;
    routes: SliceRouteType[];
    deliveries: string[];
}