import { ClientSession } from "mongoose";
import { Inject, Service } from "typedi";
import config from "../../../config";
import IRouteService from "./IRouteService";
import IRouteRepository from "../../../infrastructure/repositories/IRepository";
import RouteDTO from "../../dto/RouteDTO";
import { businessRuleErrorFactory } from "../../utils/Err";
import RouteMap from "../../../infrastructure/mappers/RouteMap";

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
    console.log(routeDTO.idRoute);
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
}
