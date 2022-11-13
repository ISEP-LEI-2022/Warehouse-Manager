export type expectedBodyRoute = {
    registration: string;
    tare: number;
    capacity: number;
    autonomy: number;
}

export interface ITruckController {
    createTruck(req: expectedBodyRoute): Promise<expectedBodyRoute>;
}