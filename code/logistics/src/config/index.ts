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
    TripService: {
      name: "TripService",
      path: "../domain/services/trip/TripService",
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
    TripRepository: {
      name: "TripRepository",
      path: "../infrastructure/repositories/trip/TripRepository",
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
    TripController: {
      name: "TripController",
      path: "../application/controllers/trip/TripController",
    },
  },
};
