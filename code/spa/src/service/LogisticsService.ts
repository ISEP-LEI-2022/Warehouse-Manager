const contextPath = import.meta.env.BASE_URL;

export default class LogisticsService {
  getTrucks() {
    return fetch(contextPath + "demo/data/trucks.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getRoutes() {
    return fetch(contextPath + "demo/data/routes.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }
}
