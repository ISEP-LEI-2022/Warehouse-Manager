import type Storage from "@/models/storage";
import type StorageDTO from "@/services/dtos/StorageDTO";
import StorageMap from "@/services/mappers/StorageMap";
import type DeliveryDTO from "@/services/dtos/DeliveryDTO";
import DeliveryMap from "@/services/mappers/DeliveryMap";
import type Delivery from "@/models/delivery";


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
    return fetch("https://localhost:7067/" + "api/Deliveries")
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
    return fetch("https://localhost:7067/" + "api/Storages")
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

  async createDelivery(delivery: Delivery) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: DeliveryMap.toJson(delivery),
    };
    const response = await fetch(
      "https://localhost:7067/" + "api/deliveries/",
      requestOptions
    );
    return await response.json();
  }

  async createStorage(storage: Storage) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: StorageMap.toJson(storage),
    };
    const response = await fetch(
      "https://localhost:7067/" + "api/storages/",
      requestOptions
    );
    return await response.json();
  }

  getStorageById(id: string) {
    return fetch("https://localhost:7067/" + "api/Storages/" + id)
      .then(async (response) => {
        const json = await response.json();
        console.log(json)
        var data: StorageDTO = json;
        if (!response.ok) {
          this.Storage_Errors.push({
            content: response.statusText,
            severity: "error",
          });
          return null;
        }
        return StorageMap.fromDTO(data);
      })
      .catch((error) => {
        this.Storage_Errors.push({
          content: error,
          severity: "error",
        });
        return null;
      });
  }

  async updateStorage(storage: Storage) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: StorageMap.toJson(storage),
    };
    const response = await fetch(
      "https://localhost:7067/" + "api/Storages/" + storage.StorageId,
      requestOptions
    );
    return await response.json();
  }

  async updateDelivery(delivery: Delivery) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: DeliveryMap.toJson(delivery),
    };
    const response = await fetch(
      "https://localhost:7067/" + "api/Deliveries/" + delivery.DeliveryId,
      requestOptions
    );
    return await response.json();
  }


  /*getStorageById(id: string) {
    return fetch(contextPath + "demo/data/storages.json")
      .then((res) => res.json())
      .then(
        (d) =>
          d.data.find((item: { storage: { id: string } }) => {
            return item.storage.id == id;
          }).designation
      );
  }*/
}
