import { SliceRouteType } from "../../../domain/aggregates/tripAggregate/Trip";

export type expectedBodyTrip = {
    idTrip: string;
    registration: string;
    date: Date;
    routes: SliceRouteType[];
    deliveries: string[];
}

export type expectedTripJSON = {
    idTrip: string;
    registration: string;
    date: Date;
    routes: SliceRouteType[];
    deliveries: string[];
}

export interface ITripController {
    createTrip(req: expectedBodyTrip): Promise<expectedBodyTrip>;
    getTripById(id: string): Promise<expectedTripJSON>;
    getTripByRegDate(registration: string, date: Date): Promise<expectedTripJSON>;
    getTrips(): Promise<expectedTripJSON[]>;
    getTripsByPagination(page:number, pageRecords:number): Promise<{tripList: expectedTripJSON[], totalRecords: number}>;
    updateTripById(req: expectedBodyTrip): Promise<expectedTripJSON>;
}