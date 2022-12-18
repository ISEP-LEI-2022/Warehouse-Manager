import { SliceRouteType } from "../../../domain/aggregates/tripAggregate/Trip";

export type expectedBodyTrip = {
    idTrip: string;
    registration: string;
    date: string;
    routes: SliceRouteType[];
    deliveries: string[];
}

export type expectedTripJSON = {
    idTrip: string;
    registration: string;
    date: string;
    routes: SliceRouteType[];
    deliveries: string[];
}

export interface ITripController {
    createTrip(req: expectedBodyTrip): Promise<expectedBodyTrip>;
    getTripById(id: string): Promise<expectedTripJSON>;
    getTrips(): Promise<expectedTripJSON[]>;
    updateTripById(req: expectedBodyTrip): Promise<expectedTripJSON>;
}