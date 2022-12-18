export default class Trip {
    idTrip: string;
    registration: string;
    dateTrip: Date;
    routes: SliceRouteType[];
    deliveries: string[];

    constructor(idTrip: string, registration: string, dateTrip: Date, routes: SliceRouteType[], deliveries: string[]) {
        this.idTrip = idTrip;
        this.registration = registration;
        this.dateTrip = dateTrip;
        this.routes = routes;
        this.deliveries = deliveries;
    }

}

export type SliceRouteType = {
  idStart: string;
  idEnd: string;
};

