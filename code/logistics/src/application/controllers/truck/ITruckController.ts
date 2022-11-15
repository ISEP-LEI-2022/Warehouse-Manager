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
    getTruckByRegistration(registration: string): Promise<expectedTruckJSON[]>;
    getTrucks(): Promise<expectedTruckJSON[]>;
    updateTruck(idRoute:string, req: expectedBodyTruck): Promise<expectedTruckJSON>;
}