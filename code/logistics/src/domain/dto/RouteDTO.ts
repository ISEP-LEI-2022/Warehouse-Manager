export default interface RouteDTO {
    idRoute: string,
    idStart: string,
    idEnd: string,
    distance: number,
    timeRequired: number,
    energyConsumed: number,
    extraChargingTime: number
}