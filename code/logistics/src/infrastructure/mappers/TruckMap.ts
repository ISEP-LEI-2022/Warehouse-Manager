import TruckDTO from "../../domain/dto/TruckDTO";
import { Truck } from "../../domain/aggregates";
import { expectedJSON } from "../../application/controllers/truck/ITruckController";

export default class TruckMap{
    public static toDTO(truck: Truck): TruckDTO {
        return {
            registration: truck.registration.value(),
            tare: truck.tare.value(),
            capacity: truck.capacity.value(),
            autonomy: truck.autonomy.value()
        } as TruckDTO;
    }

    public static toPersistence(truck: Truck): object{
        return {
            registration: truck.registration.value(),
            tare: truck.tare.value(),
            capacity: truck.capacity.value(),
            autonomy: truck.autonomy.value()
        };
    }

    public static toDomain(truckDTO: TruckDTO): Truck{
        return new Truck(
            truckDTO.autonomy,
            truckDTO.capacity,
            truckDTO.registration,
            truckDTO.tare,
        );
    }

    public static toJSON(truckDTO: TruckDTO): expectedJSON{
        return  {
            registration: truckDTO.registration,
            tare: truckDTO.tare,
            capacity: truckDTO.capacity,
            autonomy: truckDTO.autonomy
        };
    }

    public static toJSONArray(truckList: TruckDTO[]): expectedJSON[]{
        const truckListDTO : expectedJSON[] = [];
        for(const route of truckList){
            truckListDTO.push(TruckMap.toJSON(route));
        }
        return truckListDTO;
    }

}