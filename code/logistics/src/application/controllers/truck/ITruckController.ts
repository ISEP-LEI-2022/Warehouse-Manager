export type expectedBodyTruck = {
    registration: string;
    tare: number;
    capacity: number;
    autonomy: number;
}

export type expectedTruckJSON = {
    registration: string;
    tare: number;
    capacity: number;
    autonomy: number;
}

export interface ITruckController {
    createTruck(req: expectedBodyTruck): Promise<expectedBodyTruck>;
    getTruckByRegistration(registration: string): Promise<expectedTruckJSON>;
    getTrucks(): Promise<expectedTruckJSON[]>;
    getTrucksByPagination(page:number, pageRecords:number): Promise<{trucksList: expectedTruckJSON[], totalRecords: number}>;
    updateTruckByRegistration( req: expectedBodyTruck): Promise<expectedTruckJSON>;
}