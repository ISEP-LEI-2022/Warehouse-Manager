import Truck from "@/models/truck";
import type TruckDTO from "../dtos/TruckDTO";

export default class TruckMap {
  public static fromDTOArray(trucks: Array<TruckDTO>): Truck[] {
    const truckList: Truck[] = [];
    if (trucks) {
      for (const truck of trucks) {
        truckList.push(
          new Truck(
            truck.registration,
            truck.capacity,
            truck.autonomy,
            truck.tare,
            truck.active
          )
        );
      }
    }
    return truckList;
  }

  public static fromDTO(truck: TruckDTO): Truck {
    const truckRes = new Truck(
      truck.registration,
      truck.capacity,
      truck.autonomy,
      truck.tare,
      truck.active
    );
    return truckRes;
  }

  public static fromAnyArray(truck: Array<any>): Truck {
    let obj = Object.assign({}, ...truck.map((x) => ({ [x.name]: x.value })));
    return new Truck(
      obj.Registration,
      obj.Capacity,
      obj.Autonomy,
      obj.Tare,
      obj.Active
    );
  }

  public static toJson(truck: Truck): string {
    return JSON.stringify(
      {
        registration: truck.Registration,
        capacity: Number(truck.Capacity),
        autonomy: Number(truck.Autonomy),
        tare: Number(truck.Tare),
        active: Boolean(truck.Active),
      },
      null,
      "\t"
    );
  }

  public static toDTO(truck: Truck): TruckDTO {
    return {
      registration: truck.Registration,
      capacity: Number(truck.Capacity),
      autonomy: Number(truck.Autonomy),
      tare: Number(truck.Tare),
      active: Boolean(truck.Active),
    };
  }

  public static empty(): Truck {
    return new Truck("XX-00-XX", 1, 1, 1, true);
  }
}
