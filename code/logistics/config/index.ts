export default {
  /*
   * Service configs
   */
  services: {
    RouteService: {
      name: "RouteService",
      path: "../domain/services/RouteService",
    },
  },

  /*
   * Repository configs
   */
  repositories: {
    RouteRepository: {
      name: "RouteRepository",
      path: "../infrastructure/repositories/RouteRepository",
    },
  },

  /*
   * Controller configs
   */
  controllers: {
    RouteController: {
      name: "RouteController",
      path: "../application/controllers/RouteController",
    },
  },
};
