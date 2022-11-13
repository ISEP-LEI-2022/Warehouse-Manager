export type expectedBodyRoute = {
    idRoute: string;
    idStart: string;
    idEnd: string;
    distance: number;
    timeRequired: number;
    energyConsumed: number;
    extraChargingTime: number;
}

export interface IRouteController {
    createRoute(req: expectedBodyRoute): Promise<expectedBodyRoute>;
}