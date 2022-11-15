import { ClientSession } from "mongoose";
import { Inject, Service } from "typedi";
import config from "../../../config";
import ITruckService from "./ITruckService";
import ITruckRepository from "../../../infrastructure/repositories/IRepository";
import TruckDTO from "../../dto/TruckDTO";
import { businessRuleErrorFactory, getDataErrorFactory } from "../../utils/Err";
import TruckMap from "../../../infrastructure/mappers/TruckMap";
import { Truck } from "../../aggregates";

@Service()
export default class TruckService implements ITruckService {
    private session: ClientSession | null;

    constructor(
    @Inject(config.repositories.TruckRepository.name)
    private truckRepository: ITruckRepository<string>
    ) {
    this.session;
    }

    async createTruck(truckDTO: TruckDTO): Promise<TruckDTO> {
        const error = businessRuleErrorFactory();

        try {
            const truck = TruckMap.toDomain(truckDTO);

            await this.truckRepository.persists(truck);

            return truckDTO;
        } catch (err) {
            error.addError(String(err));
            throw error;
        }
    }

    async getTruckByRegistration(registration: string): Promise<TruckDTO[]> {
        const error = getDataErrorFactory();

        try {
        const route = await this.truckRepository.getDataById(registration) as Truck[];
        return convertToObjDTO(route);
        } catch (err) {
        error.addError("Error getting truck by registration");
        throw error;
        }
    }

    async getTrucks(): Promise<TruckDTO[]> {
        const error = getDataErrorFactory();

        try {
            const route = await this.truckRepository.getData() as Truck[];
            return convertToObjDTO(route);
            } catch (err) {
            error.addError(String(err));
            throw error;
        }
    }
}

function convertToObjDTO(routeList: Truck[]): TruckDTO[]{
    let routeDTOList: TruckDTO[] = [];
    routeList.forEach(route => {
        routeDTOList.push(TruckMap.toDTO(route));
    });
    return routeDTOList;
}