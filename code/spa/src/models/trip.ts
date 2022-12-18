export default class Trip {
    idTrip: string;
    registration: string;
    date: Date;
    routes: SliceRouteType[];
    deliveries: string[];

    constructor(idTrip: string, registration: string, date: Date, routes: SliceRouteType[], deliveries: string[]) {
        this.idTrip = idTrip;
        this.registration = registration;
        this.date = date;
        this.routes = routes;
        this.deliveries = deliveries;
    }

}

export type SliceRouteType = {
  idStart: string;
  idEnd: string;
};

