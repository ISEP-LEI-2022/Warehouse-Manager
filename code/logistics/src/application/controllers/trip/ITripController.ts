export type expectedBodyTrip = {
    idTrip: string;
    registration: string;
    date: string;
    routes: string[];
    deliveries: string[];
}

export type expectedTripJSON = {
    idTrip: string;
    registration: string;
    date: string;
    routes: string[];
    deliveries: string[];
}

export interface ITripController {
    createTrip(req: expectedBodyTrip): Promise<expectedBodyTrip>;
    getTripById(id: string): Promise<expectedTripJSON>;
    getTrips(): Promise<expectedTripJSON[]>;
    updateTripById(req: expectedBodyTrip): Promise<expectedTripJSON>;
}