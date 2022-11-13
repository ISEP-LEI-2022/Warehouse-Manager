import RouteDTO from "../../domain/dto/RouteDTO";
import {Route} from "../../domain/aggregates";

export default class RouteMap{
    public static toDTO(route: Route): RouteDTO {
        return {
            id: route.identifier.value(),
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
            routeDTO.id,
            routeDTO.idStart,
            routeDTO.idEnd,
            routeDTO.distance,
            routeDTO.timeRequired,
            routeDTO.energyConsumed,
            routeDTO.extraChargingTime
        );
    }

    public static toJSON(routeDTO: RouteDTO): object{
        return  {
            routeid: routeDTO.id,
            idstart: routeDTO.idStart,
            idend: routeDTO.idEnd,
            distance: routeDTO.distance,
            timerequired: routeDTO.timeRequired,
            energyconsumed: routeDTO.energyConsumed,
            extrachargingtime: routeDTO.extraChargingTime
        };
    }

}