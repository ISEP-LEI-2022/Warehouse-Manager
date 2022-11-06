export default {
  /*
   * Service configs
   */
  services: {
    routeService: {
      name: "routeService",
      path: "../domain/services/routeService",
    },
  },

  /*
   * Repository configs
   */
  repositories: {
    routeRepository: {
      name: "routeRepository",
      path: "../infrastructure/repositories/routeRepository",
    },
  },

  /*
   * Controller configs
   */
  controllers: {
    routeController: {
      name: "routeController",
      path: "../application/controllers/routeController",
    },
  },
};
