const contextPath = import.meta.env.BASE_URL;
import TruckMap from "@/mappers/TruckMap";
import RouteMap from "@/mappers/RouteMap";

export default class LogisticsService {
  getTrucks() {
    return fetch(contextPath + "demo/data/trucks.json")
      .then((res) => res.json())
      .then((d) => TruckMap.fromJSONArray(d.data));
  }

  getRoutes() {
    return fetch(contextPath + "demo/data/routes.json")
      .then((res) => res.json())
      .then((d) => RouteMap.fromJSONArray(d.data));
  }
}
