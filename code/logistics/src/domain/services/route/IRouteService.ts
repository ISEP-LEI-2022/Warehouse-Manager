import RouteDTO from "../../../domain/dto/RouteDTO";

export default interface IRouteService {
  createRoute(route: RouteDTO): Promise<RouteDTO>;
  getRouteById(id: string): Promise<RouteDTO>;
  getRoutes(): Promise<RouteDTO[]>;
  updateRouteById(id: string, route: RouteDTO): Promise<RouteDTO>;
}
