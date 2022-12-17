import Storage from "@/models/storage";
import type StorageDTO from "../dtos/StorageDTO";

export default class StorageMap {
  public static fromDTOArray(storages: Array<StorageDTO>): Storage[] {
    const storageList: Storage[] = [];
    if (storages) {
      for (const storage of storages) {
        storageList.push(
          new Storage(
            storage.designation, 
            storage.location, 
            storage.chargingSystem
          )
        );
      }
    }
    return storageList;
  }

  public static fromAnyArray(storage: Array<any>): Storage {
    let obj = Object.assign({}, ...storage.map((x) => ({ [x.name]: x.value })));
    return new Storage(obj.designation, obj.location, obj.chargingSystem);
  }

  public static toJson(storage: Storage): string {
    return JSON.stringify({
      designation: storage.Designation,
      location: storage.Location,
      chargingSystem: storage.Chargingsystems

    }, null, "\t");
  }

  // public static empty(): Storage {
  //   return new Storage("Default Storage", "Rua Default", );
  // }
}
