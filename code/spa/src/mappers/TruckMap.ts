import Truck from "@/models/truck";

export default class TruckMap {
  public static fromJSONArray(trucks: any): Truck[] {
    const truckList: Truck[] = [];
    for (const truck of trucks){
      truckList.push(new Truck(truck))
    }
    return truckList;
  }
}
