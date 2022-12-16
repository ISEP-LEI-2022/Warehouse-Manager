import Truck from "@/models/truck";

export default class TruckMap {
  public static fromJSONArray(trucks: any): Truck[] {
    const truckList: Truck[] = [];
    if (trucks) {
      for (const truck of trucks) {
        truckList.push(new Truck(truck));
      }
    }
    return truckList;
  }

  public static fromAnyArray(trucks: Array<any>): Truck {
    return new Truck();
  }

  public static toJson(truck: Truck): string {
    return "";
  }
}
