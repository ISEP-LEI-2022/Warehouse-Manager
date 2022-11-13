import { ClientSession } from "mongoose";
import { Inject, Service } from "typedi";
import config from "../../../config";
import IRouteService from "./IRouteService";
import IRouteRepository from "../../../infrastructure/repositories/IRepository";
import RouteDTO from "../../dto/RouteDTO";
import { businessRuleErrorFactory, getDataErrorFactory } from "../../utils/Err";
import RouteMap from "../../../infrastructure/mappers/RouteMap";
import { Route } from "../../aggregates";

@Service()
export default class RouteService implements IRouteService {
  private session: ClientSession | null;

  constructor(
    @Inject(config.repositories.RouteRepository.name)
    private routeRepository: IRouteRepository<string>
  ) {
    this.session;
  }

  async createRoute(routeDTO: RouteDTO): Promise<RouteDTO> {
    const error = businessRuleErrorFactory();

    try {
      const route = RouteMap.toDomain(routeDTO);

      await this.routeRepository.persists(route);

      return routeDTO;
    } catch (err) {
      error.addError(String(err));
      throw error;
    }
  }

  async getRouteById(id: string): Promise<RouteDTO[]> {
    const error = getDataErrorFactory();

    try {
      const route = await this.routeRepository.getDataById(id) as Route[];
      return convertToObjDTO(route);
    } catch (err) {
      error.addError("Error getting route by id");
      throw error;
    }
  }

  async getRoutes(): Promise<RouteDTO[]> {
    const error = getDataErrorFactory();

    try {
      const route = await this.routeRepository.getData() as Route[];
      return convertToObjDTO(route);
    } catch (err) {
      error.addError(String(err));
      throw error;
    }
  }
}


function convertToObjDTO(routeList: Route[]): RouteDTO[]{
  let routeDTOList: RouteDTO[] = [];
  routeList.forEach(route => {
    routeDTOList.push(RouteMap.toDTO(route));
  });
  return routeDTOList;
}