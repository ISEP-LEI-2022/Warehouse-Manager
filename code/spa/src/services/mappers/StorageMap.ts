import Storage from "@/models/storage";
import Location from "@/models/location";
import type StorageDTO from "../dtos/StorageDTO";
import Address from "@/models/address";
import City from "@/models/city";
import ChargingSystems from "@/models/chargingSystem";

export default class StorageMap {
  public static fromDTOArray(storages: Array<StorageDTO>): Storage[] {
    const storageList: Storage[] = [];
    if (storages) {
      for (const storage of storages) {
        storageList.push(
          new Storage(
            storage.id,
            storage.designation, 
            storage.location.latitude,
            storage.location.longitude,
            storage.location.altitude,
            storage.location.address.street,
            storage.location.address.door,
            storage.location.address.floor,
            storage.location.address.postalCode,
            storage.location.address.city.number,
            storage.location.address.city.name,
            storage.chargingSystems
          )
        );
      }
    }
    return storageList;
  }


  public static fromDTO(storageDTO: StorageDTO): Storage {
    return new Storage(
      storageDTO.id,
      storageDTO.designation, 
      storageDTO.location.latitude,
      storageDTO.location.longitude,
      storageDTO.location.altitude,
      storageDTO.location.address.street,
      storageDTO.location.address.door,
      storageDTO.location.address.floor,
      storageDTO.location.address.postalCode,
      storageDTO.location.address.city.number,
      storageDTO.location.address.city.name,
      storageDTO.chargingSystems
    )
  }



  public static fromAnyArray(storage: Array<any>): Storage {
    let obj = Object.assign({}, ...storage.map((x) => ({ [x.name]: x.value })));
    return new Storage(
              obj.StorageId, 
              obj.Designation, 
              obj.Latitude,
              obj.Longitude,
              obj.Altitude,
              obj.Street,
              obj.Door,
              obj.Floor,
              obj.PostalCode,
              obj.Number,
              obj.Name,
              obj.ChargingSystems);
  }


  public static fromAnyArrayChargingSystem(storage: Array<any>): ChargingSystems {
    let obj = Object.assign({}, ...storage.map((x) => ({ [x.name]: x.value })));
    return new ChargingSystems(
              obj.ChargingTime,    )
            }


  public static toJson(storage: Storage): string {
    return JSON.stringify({
      id: storage.StorageId,
      designation: storage.Designation,
      location: {
        latitude: storage.Latitude,
        longitude: storage.Longitude,
        altitude: storage.Altitude,
        address: {
          street: storage.Street,
          door: storage.Door,
          floor: storage.Floor,
          postalCode: storage.PostalCode,
          city: {
            number: storage.Number,
            name: storage.Name
          }
        }
      },
      chargingSystems: storage.Chargingsystems

    }, null, "\t");
  }

  public static empty(): Storage {
    var chargingSystems: ChargingSystems[] = [];
    return new Storage("","","","","","","","","",1,"",chargingSystems);
  }

  public static emptyChargingSystem(): ChargingSystems {
    return new ChargingSystems("");
  }
}
