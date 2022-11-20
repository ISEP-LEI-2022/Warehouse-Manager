import { ClientSession } from "mongoose";
import { Inject, Service } from "typedi";
import config from "../../../config";
import IRouteService from "./IRouteService";
import IRouteRepository from "../../../infrastructure/repositories/IRepository";
import RouteDTO from "../../dto/RouteDTO";
import {
  businessRuleErrorFactory,
  getDataErrorFactory,
  persistanceErrorFactory,
} from "../../utils/Err";
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
      console.log(this.routeRepository.exists(routeDTO.idRoute));
      !!(await this.routeRepository.exists(routeDTO.idRoute)) === true
        ? error.addError("Route with this idRoute already exists")
        : error.addError("Error inserting route: verify the body");
      throw error;
    }
  }

  async getRouteById(id: string): Promise<RouteDTO> {
    const error = getDataErrorFactory();

    try {
      const route = (await this.routeRepository.getDataById(id)) as Route;
      return RouteMap.toDTO(route);
    } catch (err) {
      error.addError("Error getting route by id");
      throw error;
    }
  }

  async getRoutes(): Promise<RouteDTO[]> {
    const error = getDataErrorFactory();

    try {
      const route = (await this.routeRepository.getData()) as Route[];
      return convertToObjDTO(route);
    } catch (err) {
      error.addError("Error getting routes");
      throw error;
    }
  }

  async updateRouteById(id: string, routeDTO: RouteDTO): Promise<RouteDTO> {
    const error = persistanceErrorFactory();

    try {
      const updated = await this.routeRepository.updateDataById(id, routeDTO);
      return RouteMap.toDTO(updated as Route);
    } catch (err) {
      !!(await this.routeRepository.exists(routeDTO.idRoute)) === true
        ? error.addError("Route with this idRoute already exists")
        : error.addError("Error updating route");
      throw error;
    }
  }
}

function convertToObjDTO(routeList: Route[]): RouteDTO[] {
  const routeDTOList: RouteDTO[] = [];
  routeList.forEach((route) => {
    routeDTOList.push(RouteMap.toDTO(route));
  });
  return routeDTOList;
}
