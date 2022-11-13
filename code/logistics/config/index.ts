export default {
  /*
   * Service configs
   */
  services: {
    RouteService: {
      name: "RouteService",
      path: "../domain/services/route/RouteService",
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
  },

  /*
   * Controller configs
   */
  controllers: {
    RouteController: {
      name: "RouteController",
      path: "../application/controllers/route/RouteController",
    },
  },
};
