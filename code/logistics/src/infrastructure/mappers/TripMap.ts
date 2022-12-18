import { SliceRouteType } from "../../domain/aggregates/tripAggregate/Trip";
import { expectedTripJSON } from "../../application/controllers/trip/ITripController";
import { Trip } from "../../domain/aggregates";
import TripDTO from "../../domain/dto/TripDTO";

export default class TripMap {
  public static toDTO(trip: Trip): TripDTO {
    let slice: SliceRouteType[] = [];

    trip.routes.forEach((route) => {
      slice.push({
        idStart: route.idStart.value(),
        idEnd: route.idEnd.value(),
      });
    });

    return {
      idTrip: trip.identifier.value(),
      registration: trip.registration.value(),
      date: trip.dateTrip.value(),
      routes: slice,
      deliveries: trip.deliveries.map((delivery) => delivery.value()),
    } as TripDTO;
  }

  public static toPersistence(trip: Trip): TripDTO {
    let slice: SliceRouteType[] = [];

    trip.routes.forEach((route) => {
      slice.push({
        idStart: route.idStart.value(),
        idEnd: route.idEnd.value(),
      });
    });

    return {
      idTrip: trip.identifier.value(),
      registration: trip.registration.value(),
      date: trip.dateTrip.value(),
      routes: slice,
      deliveries: trip.deliveries.map((delivery) => delivery.value()),
    };
  }

  public static toDomain(tripDTO: TripDTO): Trip {
    let slice: SliceRouteType[] = [];

    tripDTO.routes.forEach((route) => {
      slice.push({
        idStart: route.idStart,
        idEnd: route.idEnd,
      });
    });

    return new Trip(
      tripDTO.idTrip,
      tripDTO.registration,
      tripDTO.date,
      slice,
      tripDTO.deliveries
    );
  }

  public static toJSON(tripDTO: TripDTO): expectedTripJSON {
    let slice: SliceRouteType[] = [];
    tripDTO.routes.forEach((route) => {
        slice.push({
          idStart: route.idStart,
          idEnd: route.idEnd,
        });
      });

    return {
      idTrip: tripDTO.idTrip,
      registration: tripDTO.registration,
      date: tripDTO.date,
      routes: slice,
      deliveries: tripDTO.deliveries,
    };
  }

  public static toJSONArray(tripList: TripDTO[]): expectedTripJSON[] {
    const tripListDTO: expectedTripJSON[] = [];
    for (const trip of tripList) {
      tripListDTO.push(TripMap.toJSON(trip));
    }
    return tripListDTO;
  }
}
