import Trip from "@/models/trip";
import type TripDTO from "../dtos/TripDTO";

export default class TripMap {
  public static fromDTO(trip: TripDTO): Trip {

    return new Trip(
        trip.idTrip,
        trip.registration,
        trip.dateTrip,
        trip.routes,
        trip.deliveries
      ); ;
  }

  public static empty(): Trip {
    return new Trip("", "", new Date(), [], []);
  }
}
