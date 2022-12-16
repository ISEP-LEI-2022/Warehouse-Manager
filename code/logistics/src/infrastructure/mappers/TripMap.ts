import { expectedTripJSON } from "../../application/controllers/trip/ITripController";
import { Trip } from "../../domain/aggregates";
import TripDTO from "../../domain/dto/TripDTO";

export default class TripMap{
    public static toDTO(trip: Trip): TripDTO{
        return {
            idTrip: trip.identifier.value(),
            registration: trip.registration.value(),
            date: trip.dateTrip.value(),
            routes: trip.routes.map(route => route.value()),
            deliveries: trip.deliveries.map(delivery => delivery.value())
        } as TripDTO;
    }

    public static toPersistence(trip: Trip): TripDTO{
        return {
            idTrip: trip.identifier.value(),
            registration: trip.registration.value(),
            date: trip.dateTrip.value(),
            routes: trip.routes.map(route => route.value()),
            deliveries: trip.deliveries.map(delivery => delivery.value())
        };
    }

    public static toDomain(tripDTO: TripDTO): Trip{
        return new Trip(
            tripDTO.idTrip,
            tripDTO.registration,
            tripDTO.date,
            tripDTO.routes,
            tripDTO.deliveries
        );
    }

    public static toJSON(tripDTO: TripDTO): expectedTripJSON {
        return  {
            idTrip: tripDTO.idTrip,
            registration: tripDTO.registration,
            date: tripDTO.date,
            routes: tripDTO.routes,
            deliveries: tripDTO.deliveries
        };
    }

    public static toJSONArray(tripList: TripDTO[]): expectedTripJSON[] {
        const tripListDTO : expectedTripJSON[] = [];
        for(const trip of tripList){
            tripListDTO.push(TripMap.toJSON(trip));
        }
        return tripListDTO;
    }
}
