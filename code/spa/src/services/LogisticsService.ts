import type Truck from "@/models/truck";
import type Route from "@/models/route";
import type TruckDTO from "@/services/dtos/TruckDTO";
import type RouteDTO from "@/services/dtos/RouteDTO";
import TruckMap from "@/services/mappers/TruckMap";
import RouteMap from "@/services/mappers/RouteMap";

const contextPath = import.meta.env.BASE_URL;
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
        const json = await response.json();
        console.log(json)
        var data: Array<TruckDTO> = json;
        if (!response.ok) {
          this.Truck_Errors.push({
            content: response.statusText,
            severity: "error",
          });
          return TruckMap.fromDTOArray([]);
        }
        return TruckMap.fromDTOArray(data);
      })
      .catch((error) => {
        this.Truck_Errors.push({
          content: error,
          severity: "error",
        });
        return TruckMap.fromDTOArray([]);
      });
  }

  async createTruck(truck: Truck) {
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

  getRoutes() {
    return fetch(contextPath + "demo/data/routes.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  async createRoute(route: Route) {
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
}
