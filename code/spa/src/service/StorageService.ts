const contextPath = import.meta.env.BASE_URL;

export default class StorageService {
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
}
