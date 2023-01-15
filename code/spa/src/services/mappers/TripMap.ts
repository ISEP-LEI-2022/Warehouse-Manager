import Trip from "@/models/trip";
import type TripDTO from "../dtos/TripDTO";

export default class TripMap {
  public static fromDTOArray(trips: TripDTO[]): Trip[] {

    const tripsList: Trip[] = [];
    for (const trip of trips) {
      tripsList.push(
        new Trip(
          trip.idTrip,
          trip.registration,
          trip.date,
          trip.routes,
          trip.deliveries
        )
      );
    }
    return tripsList;
  }

  public static fromDTO(trip: TripDTO): Trip {
    return new Trip(
      trip.idTrip,
      trip.registration,
      trip.date,
      trip.routes,
      trip.deliveries
    );
  }

  public static empty(): Trip {
    return new Trip("", "", new Date(), [], []);
  }
}
