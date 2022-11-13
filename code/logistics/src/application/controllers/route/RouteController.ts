import { Inject, Service } from 'typedi';
import config from '../../../config';
import IRouteService from '../../../domain/services/route/IRouteService';
import { validateRequestParams } from '../../../domain/utils/UtilityFunctions';
import {expectedJSON, IRouteController} from './IRouteController';
import {badRequestErrorFactory} from "../../../domain/utils/Err";
import RouteDTO from '../../../domain/dto/RouteDTO';
import RouteMap from '../../../infrastructure/mappers/RouteMap';

@Service()
export default class RouteController implements IRouteController {
  constructor(
    @Inject(config.services.RouteService.name)
    private routeService: IRouteService
  ) {}
  
  async createRoute(body: object): Promise<any> {
    if (!validateRequestParams(body, ['idRoute','idStart', 'idEnd', 'distance', 'timeRequired', 'energyConsumed', 'extraChargingTime'])) {
        const error = badRequestErrorFactory()
        error.addError('Invalid request body')
        throw error
    }

    const routeDTO = await this.routeService.createRoute(body as RouteDTO);
    return RouteMap.toJSON(routeDTO);

  }

  async getRouteById(id: string): Promise<expectedJSON[]> {
    const routeDTO = await this.routeService.getRouteById(id);
    return RouteMap.toJSONArray(routeDTO);
  }

  async getRoutes(): Promise<expectedJSON[]> {
    const routeDTO = await this.routeService.getRoutes();
    return RouteMap.toJSONArray(routeDTO);
  }
}