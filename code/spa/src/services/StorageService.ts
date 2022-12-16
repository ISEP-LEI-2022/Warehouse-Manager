const contextPath = import.meta.env.BASE_URL;

export default class StorageService {

  Storage_Errors: Array<any>;
  Delivery_Errors: Array<any>;

  constructor() {
    this.Storage_Errors = [];
    this.Delivery_Errors = [];
  }

  getDeliveries() {
    return fetch(contextPath + "demo/data/deliveries.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getStorages() {
    return fetch(contextPath + "demo/data/storages.json")
      .then((res) => res.json())
      .then((d) => d.data);
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
