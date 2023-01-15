import type Truck from "@/models/truck";
import type Route from "@/models/route";
import type TruckDTO from "@/services/dtos/TruckDTO";
import type RouteDTO from "@/services/dtos/RouteDTO";
import TruckMap from "@/services/mappers/TruckMap";
import RouteMap from "@/services/mappers/RouteMap";

import type TripDTO from "./dtos/TripDTO";
import TripMap from "./mappers/TripMap";
import type Trip from "@/models/trip";

export default class LogisticsService {
  public static getTrucks(getErros: Function = (errors: Array<any>) => {}) {
    return fetch(import.meta.env.VITE_LOGISTICS_API + "trucks")
      .then(async (response) => {
        const json = await response.json();
        var data: Array<TruckDTO> = json;
        if (!response.ok) {
          getErros({
            content: response.statusText,
            severity: "error",
          });
          return TruckMap.fromDTOArray([]);
        }
        return TruckMap.fromDTOArray(data);
      })
      .catch((error) => {
        getErros({
          content: error,
          severity: "error",
        });
        return TruckMap.fromDTOArray([]);
      });
  }

  public static async createTruck(truck: Truck) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: TruckMap.toJson(truck),
    };
    const response = await fetch(
      import.meta.env.VITE_LOGISTICS_API + "trucks",
      requestOptions
    );
    return await response.json();
  }

  public static getRoutes(getErros: Function = (errors: Array<any>) => {}) {
    return fetch(import.meta.env.VITE_LOGISTICS_API + "routes")
      .then(async (response) => {
        const json = await response.json();
        var data: Array<RouteDTO> = json;
        if (!response.ok) {
          getErros({
            content: response.statusText,
            severity: "error",
          });
          return RouteMap.fromDTOArray([]);
        }

        return RouteMap.fromDTOArray(data);
      })
      .catch((error) => {
        getErros({
          content: error,
          severity: "error",
        });
        return RouteMap.fromDTOArray([]);
      });
  }

  public static async createRoute(route: Route) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: RouteMap.toJson(route),
    };
    const response = await fetch(
      import.meta.env.VITE_LOGISTICS_API + "routes",
      requestOptions
    );
    return await response.json();
  }

  public static async getTrips(
    registration: string,
    date: Date,
    getErros: Function = (errors: Array<any>) => {}
  ) {
    const formatted_date = date.toISOString().slice(0, 10);
    return fetch(
      import.meta.env.VITE_LOGISTICS_API +
        "trips/" +
        registration +
        "/" +
        formatted_date
    )
      .then(async (response) => {
        const json = await response.json();
        console.log(json);
        var data: Array<TripDTO> = json;
        if (!response.ok) {
          getErros({
            content: response.statusText,
            severity: "error",
          });
          return TripMap.fromDTOArray([]);
        }

        return TripMap.fromDTOArray(data);
      })
      .catch((error) => {
        getErros({
          content: error,
          severity: "error",
        });
        return TripMap.fromDTOArray([]);
      });
  }

  public static async updateActiveStatus(
    registration: string,
    getErros: Function = (errors: Array<any>) => {}
  ) {
    const requestOptions = {
      method: "PATCH",
      headers: {'Content-Type': 'application/json'},
    };
    const response = await fetch(
      import.meta.env.VITE_LOGISTICS_API + "trucks" + "/status/" + registration,
      requestOptions
    )
      .then(async (response) => {
        const json = await response.json();
        var data: TruckDTO = json;
        if (!response.ok) {
          getErros({
            content: response.statusText,
            severity: "error",
          });
          return null;
        }
        return TruckMap.fromDTO(data);
      })
      .catch((error) => {
        getErros({
          content: error,
          severity: "error",
        });
        return null;
      });
    return await response;
  }

  public static async optimizeTrip(
    registration: string,
    date: Date,
    getErros: Function = (errors: Array<any>) => {}
  ): Promise<Trip[]>{
    const formatted_date = date.toISOString().slice(0, 10);
    const requestOptions = {
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
    };
    const response = await fetch(
      import.meta.env.VITE_LOGISTICS_API + "trips" + "/optimize/" + registration + "/" + formatted_date,
      requestOptions
    )
      .then(async (response) => {
        const json = await response.json();
        var data: TripDTO = json;
        if (!response.ok) {
          getErros({
            content: "Unknow error",
            severity: "error",
          });
          return TripMap.empty();
        }
        console.log(data);
        return TripMap.fromDTO(data);
      })
      .catch((error) => {
          getErros({
            content: error,
            severity: "error",
          });
          return TripMap.empty();
      });
    return await [response];
  }
}
