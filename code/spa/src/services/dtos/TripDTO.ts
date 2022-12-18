import type { SliceRouteType } from "@/models/trip";

export default interface TripDTO {
    idTrip: string;
    registration: string;
    dateTrip: Date;
    routes: SliceRouteType[];
    deliveries: string[];
}