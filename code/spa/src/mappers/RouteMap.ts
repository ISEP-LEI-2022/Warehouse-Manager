import Route from "@/models/route";

export default class RouteMap {
  public static fromJSONArray(trucks: any): Route[] {
    const truckList: Route[] = [];
    for (const truck of trucks){
      truckList.push(new Route(truck))
    }
    return truckList;
  }
}
