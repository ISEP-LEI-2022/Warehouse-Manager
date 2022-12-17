//import type Storage from "@/models/storage";
import type StorageDTO from "@/services/dtos/StorageDTO";
import StorageMap from "@/services/mappers/StorageMap";
import type DeliveryDTO from "@/services/dtos/DeliveryDTO";
import DeliveryMap from "@/services/mappers/DeliveryMap";


const contextPath = import.meta.env.BASE_URL;

export default class StorageService {

  Storage_Errors: Array<any>;
  Delivery_Errors: Array<any>;

  constructor() {
    this.Storage_Errors = [];
    this.Delivery_Errors = [];
  }

  /*getDeliveries() {
    return fetch(contextPath + "demo/data/deliveries.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }*/

  getDeliveries() {
    return fetch("https://localhost:7067/api/Deliveries")
      .then(async (response) => {
        const json = await response.json();
        console.log(json)
        var data: Array<DeliveryDTO> = json;
        if (!response.ok) {
          this.Delivery_Errors.push({
            content: response.statusText,
            severity: "error",
          });
          return DeliveryMap.fromDTOArray([]);
        }
        return DeliveryMap.fromDTOArray(data);
      })
      .catch((error) => {
        this.Delivery_Errors.push({
          content: error,
          severity: "error",
        });
        return DeliveryMap.fromDTOArray([]);
      });
  }

  /*getStorages() {
    return fetch(contextPath + "demo/data/storages.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }*/




  getStorages() {
    return fetch("https://localhost:7067/api/Storages")
      .then(async (response) => {
        const json = await response.json();
        console.log(json)
        var data: Array<StorageDTO> = json;
        if (!response.ok) {
          this.Storage_Errors.push({
            content: response.statusText,
            severity: "error",
          });
          return StorageMap.fromDTOArray([]);
        }
        return StorageMap.fromDTOArray(data);
      })
      .catch((error) => {
        this.Storage_Errors.push({
          content: error,
          severity: "error",
        });
        return StorageMap.fromDTOArray([]);
      });
  }





  getStorageById(id: string) {
    return fetch(contextPath + "demo/data/storages.json")
      .then((res) => res.json())
      .then(
        (d) =>
          d.data.find((item: { storage: { id: string } }) => {
            return item.storage.id == id;
          }).designation
      );
  }
}
