import { Inject, Service } from "typedi";
import config from "../../../config";
import IRouteService from "../../../domain/services/route/IRouteService";
import { validateRequestParams } from "../../../domain/utils/UtilityFunctions";
import {
  IRouteController,
  expectedRouteJSON,
  expectedBodyRoute,
  expectedPatchBodyRoute,
} from "./IRouteController";
import { badRequestErrorFactory } from "../../../domain/utils/Err";
import RouteDTO from "../../../domain/dto/RouteDTO";
import RouteMap from "../../../infrastructure/mappers/RouteMap";
import { Get, Route, Tags, Post, Body, Path, Patch } from "tsoa";

@Route("/routes")
@Tags("Routes")
@Service()
export default class RouteController implements IRouteController {
  constructor(
    @Inject(config.services.RouteService.name)
    private routeService: IRouteService
  ) {}

  /**
   * @summary Returns all the routes that exist
   * @returns JSON with all the routes
   */
  @Get("/")
  async getRoutes(): Promise<expectedRouteJSON[]> {
    const routeDTO = await this.routeService.getRoutes();
    return RouteMap.toJSONArray(routeDTO);
  }

  /**
   * @summary This method searches for a route from the given id
   * @param idRoute idRoute of the route
   * @returns {expectedRouteJSON} Returns a JSON with the route information
   */
  @Get("/:idRoute")
  async getRouteById(@Path() idRoute: string): Promise<expectedRouteJSON> {
    const routeDTO = await this.routeService.getRouteById(idRoute);
    return RouteMap.toJSON(routeDTO);
  }

  /**
   * @summary Creates a new route from the given body and returns the created route
   * @returns {expectedBodyRoute} Returns a JSON with the created route
   */
  @Post("/")
  async createRoute(
    @Body() body: expectedBodyRoute
  ): Promise<expectedBodyRoute> {
    if (
      !validateRequestParams(body, [
        "idRoute",
        "idStart",
        "idEnd",
        "distance",
        "timeRequired",
        "energyConsumed",
        "extraChargingTime",
      ])
    ) {
      const error = badRequestErrorFactory();
      error.addError("Invalid request body");
      throw error;
    }

    const routeDTO = await this.routeService.createRoute(body as RouteDTO);
    return RouteMap.toJSON(routeDTO);
  }

  /**
   * @summary Searches for the route with the given idRoute and updates it with any of the parameters given in the body
   * @param idRoute Id of the route to be updated
   * @param body Can update any of the parameters of the route, not all of them are required
   * @returns Updated route
   */
  @Patch("/:idRoute")
  async updateRouteById(
    @Path() idRoute: string,
    @Body() body: expectedPatchBodyRoute
  ): Promise<expectedRouteJSON> {
    //Any of these parameters is valid to update a route
    if (
      !validateRequestParams(
        body,
        [],
        [
          "idStart",
          "idEnd",
          "distance",
          "timeRequired",
          "energyConsumed",
          "extraChargingTime",
        ]
      )
    ) {
      const error = badRequestErrorFactory();
      error.addError("Invalid request body");
      throw error;
    }
    const routeDTO = await this.routeService.updateRouteById(
      idRoute,
      body as RouteDTO
    );
    return RouteMap.toJSON(routeDTO);
  }
}
