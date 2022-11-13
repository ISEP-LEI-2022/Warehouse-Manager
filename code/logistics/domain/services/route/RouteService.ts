import { ClientSession } from "mongoose";
import { Inject, Service } from "typedi";
import config from "../../../config";
import IRouteService from "./IRouteService";
import IRouteRepository from "../../../infrastructure/repositories/routeRepository/IRouteRepository";
import RouteDTO from "../../dto/RouteDTO";
import { businessRuleErrorFactory } from "../../utils/Err";
import RouteMap from "../../../infrastructure/mappers/RouteMap";

@Service("CreateRouteService")
export default class CreateRouteService implements IRouteService {
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
      error.addError(err);
      throw error;
    }
  }
}
