import Route from "@/models/route";
import type RouteDTO from "../dtos/RouteDTO";

export default class RouteMap {
  public static fromDTOArray(trucks: Array<RouteDTO>): Route[] {
    const truckList: Route[] = [];
    for (const truck of trucks) {
      truckList.push(
        new Route(
          truck.idRoute,
          truck.idStart,
          truck.idEnd,
          truck.distance,
          truck.timeRequired,
          truck.energyConsumed,
          truck.extraChargingTime
        )
      );
    }
    return truckList;
  }

  public static fromAnyArray(route: Array<any>): Route {
    let obj = Object.assign({}, ...route.map((x) => ({ [x.name]: x.value })));
    return new Route(
      obj.Route,
      obj.Start,
      obj.End,
      obj.Distance,
      obj.TimeRequired,
      obj.EnergyConsumed,
      obj.ExtraChargingTime
    );
  }

  public static toJson(route: Route): string {
    return JSON.stringify({
      idRoute: route.Route,
      extraChargingTime: Number(route.ExtraChargingTime),
      energyConsumed: Number(route.EnergyConsumed),
      timeRequired: Number(route.TimeRequired),
      distance: Number(route.Distance),
      idEnd: route.End,
      idStart: route.Start,
    }, null, "\t");
  }

  public static empty(): Route {
    return new Route("", "", "", 1, 1, 1, 1);
  }
}
