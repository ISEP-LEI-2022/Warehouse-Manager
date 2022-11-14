import RouteDTO from "../../domain/dto/RouteDTO";
import {Route} from "../../domain/aggregates";
import { expectedRouteJSON } from "../../application/controllers/route/IRouteController";

export default class RouteMap{
    public static toDTO(route: Route): RouteDTO {
        return {
            idRoute: route.identifier.value(),
            idStart: route.idStart.value(),
            idEnd: route.idEnd.value(),
            distance: route.distance.value(),
            timeRequired: route.timeRequired.value(),
            energyConsumed: route.energyConsumed.value(),
            extraChargingTime: route.extraChargingTime.value()
        } as RouteDTO;
    }

    public static toPersistence(route: Route): object{
        return {
            idRoute: route.identifier.value(),
            idStart: route.idStart.value(),
            idEnd: route.idEnd.value(),
            distance: route.distance.value(),
            timeRequired: route.timeRequired.value(),
            energyConsumed: route.energyConsumed.value(),
            extraChargingTime: route.extraChargingTime.value()
        };
    }

    public static toDomain(routeDTO: RouteDTO): Route{
        return new Route(
            routeDTO.idRoute,
            routeDTO.idStart,
            routeDTO.idEnd,
            routeDTO.distance,
            routeDTO.timeRequired,
            routeDTO.energyConsumed,
            routeDTO.extraChargingTime
        );
    }

    public static toJSON(routeDTO: RouteDTO): expectedRouteJSON{
        return  {
            idRoute: routeDTO.idRoute,
            idStart: routeDTO.idStart,
            idEnd: routeDTO.idEnd,
            distance: routeDTO.distance,
            timeRequired: routeDTO.timeRequired,
            energyConsumed: routeDTO.energyConsumed,
            extraChargingTime: routeDTO.extraChargingTime
        };
    }


    public static toJSONArray(routeList: RouteDTO[]): expectedRouteJSON[]{
        const routeListDTO : expectedRouteJSON[] = [];
        for(const route of routeList){
            routeListDTO.push(RouteMap.toJSON(route));
        }
        return routeListDTO;
    }


}