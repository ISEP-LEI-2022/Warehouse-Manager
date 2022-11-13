export default {
  /*
   * Service configs
   */
  services: {
    RouteService: {
      name: "RouteService",
      path: "../domain/services/route/RouteService",
    },
    TruckService: {
      name: "TruckService",
      path: "../domain/services/truck/TruckService",
    },
  },

  /*
   * Repository configs
   */
  repositories: {
    RouteRepository: {
      name: "RouteRepository",
      path: "../infrastructure/repositories/route/RouteRepository",
    },
    TruckRepository: {
      name: "TruckRepository",
      path: "../infrastructure/repositories/truck/TruckRepository",
    },
  },

  /*
   * Controller configs
   */
  controllers: {
    RouteController: {
      name: "RouteController",
      path: "../application/controllers/route/RouteController",
    },
    TruckController: {
      name: "TruckController",
      path: "../application/controllers/truck/TruckController",
    },
  },
};
