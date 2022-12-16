import Truck from "@/models/truck";

export default class TruckMap {
  public static fromJSONArray(trucks: any): Truck[] {
    const truckList: Truck[] = [];
    if (trucks) {
      for (const truck of trucks) {
        truckList.push(new Truck(truck.registration, truck.capacity, truck.autonomy, truck.tare));
      }
    }
    return truckList;
  }

  public static fromAnyArray(truck: Array<any>): Truck {
    let obj = Object.assign({}, ...truck.map((x) => ({ [x.name]: x.value })));
    return new Truck(obj.Registration, obj.Capacity, obj.Autonomy, obj.Tare);
  }

  public static toJson(truck: Truck): string {
    return JSON.stringify({
      registration: truck.Registration,
      capacity: Number(truck.Capacity),
      autonomy: Number(truck.Autonomy),
      tare: Number(truck.Tare),
    }, null, "\t");
  }

  public static empty(): Truck {
    return new Truck("XX-00-XX", 1, 1, 1);
  }
}
