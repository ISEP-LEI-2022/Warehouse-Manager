import TruckMap from "@/mappers/TruckMap";
import RouteMap from "@/mappers/RouteMap";
import type Truck from "@/models/truck";
import type Route from "@/models/route";

export default class LogisticsService {
  Truck_Errors: Array<any>;
  Route_Errors: Array<any>;

  constructor() {
    this.Truck_Errors = [];
    this.Route_Errors = [];
  }

  getTrucks() {
    return fetch(import.meta.env.VITE_LOGISTICS_API + "trucks")
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          this.Truck_Errors.push({
            content: response.statusText,
            severity: "error",
          });
          return TruckMap.fromJSONArray([]);
        }
        return TruckMap.fromJSONArray(data);
      })
      .catch((error) => {
        this.Truck_Errors.push({
          content: error,
          severity: "error",
        });
        return TruckMap.fromJSONArray([]);
      });
  }

  async createTruck(truck: Truck) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(truck.toJSON(), null, "\t"),
    };
    const response = await fetch(
      import.meta.env.VITE_LOGISTICS_API + "trucks",
      requestOptions
    );
    return await response.json();
  }

  getRoutes() {
    return fetch(import.meta.env.VITE_LOGISTICS_API + "routes")
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          this.Route_Errors.push({
            content: response.statusText,
            severity: "error",
          });
          return RouteMap.fromJSONArray([]);
        }

        return RouteMap.fromJSONArray(data);
      })
      .catch((error) => {
        this.Route_Errors.push({
          content: error,
          severity: "error",
        });
        return RouteMap.fromJSONArray([]);
      });
  }

  async createRoute(route: Route) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(route.toJSON(), null, "\t"),
    };
    const response = await fetch(
      import.meta.env.VITE_LOGISTICS_API + "routes",
      requestOptions
    );
    return await response.json();
  }
}
