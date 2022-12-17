import Storage from "@/models/storage";
import type StorageDTO from "../dtos/StorageDTO";

export default class StorageMap {
  public static fromDTOArray(storages: Array<StorageDTO>): Storage[] {
    const storageList: Storage[] = [];
    if (storages) {
      for (const storage of storages) {
        storageList.push(new Storage(storage.designation));
      }
    }
    return storageList;
  }
}