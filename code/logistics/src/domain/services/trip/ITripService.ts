import TripDTO from "../../dto/TripDTO";

export default interface ITripService {
    createTrip(trip: TripDTO): Promise<TripDTO>;
    getTripById(id: string): Promise<TripDTO>;
    getTripByRegDate(registration: string, date: Date): Promise<TripDTO>;
    getTrips(): Promise<TripDTO[]>;
    updateTripById(trip: TripDTO): Promise<TripDTO>;
}