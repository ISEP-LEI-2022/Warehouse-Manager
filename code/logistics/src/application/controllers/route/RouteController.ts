import { Inject, Service } from 'typedi';
import config from '../../../config';
import IRouteService from '../../../domain/services/route/IRouteService';
import { validateRequestParams } from '../../../domain/utils/UtilityFunctions';
import { IRouteController, expectedRouteJSON, expectedBodyRoute} from './IRouteController';
import {badRequestErrorFactory} from "../../../domain/utils/Err";
import RouteDTO from '../../../domain/dto/RouteDTO';
import RouteMap from '../../../infrastructure/mappers/RouteMap';
import { Get, Route, Tags,  Post, Body, Path } from "tsoa";


@Route("/routes")
@Tags("Routes")
@Service()
export default class RouteController implements IRouteController {
  constructor(
    @Inject(config.services.RouteService.name)
    private routeService: IRouteService
  ) {}

  @Post("/")
  async createRoute(@Body() body: expectedBodyRoute): Promise<expectedBodyRoute> {
    if (!validateRequestParams(body, ['idRoute','idStart', 'idEnd', 'distance', 'timeRequired', 'energyConsumed', 'extraChargingTime'])) {
        const error = badRequestErrorFactory()
        error.addError('Invalid request body')
        throw error
    }

    const routeDTO = await this.routeService.createRoute(body as RouteDTO);
    return RouteMap.toJSON(routeDTO);

  }

  @Get("/:id")
  async getRouteById(@Path() id: string): Promise<expectedRouteJSON[]> {
    const routeDTO = await this.routeService.getRouteById(id);
    return RouteMap.toJSONArray(routeDTO);
  }

  @Get("/")
  async getRoutes(): Promise<expectedRouteJSON[]> {
    const routeDTO = await this.routeService.getRoutes();
    return RouteMap.toJSONArray(routeDTO);
  }
}