import { ClientSession } from "mongoose";
import { Inject, Service } from "typedi";
import config from "../../../config";
import ITruckService from "./ITruckService";
import ITruckRepository from "../../../infrastructure/repositories/IRepository";
import TruckDTO from "../../dto/TruckDTO";
import { businessRuleErrorFactory, getDataErrorFactory, persistanceErrorFactory } from "../../utils/Err";
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

    async getTruckByRegistration(registration: string): Promise<TruckDTO> {
        const error = getDataErrorFactory();

        try {
            const truck = await this.truckRepository.getDataById(registration) as Truck;
            return TruckMap.toDTO(truck);
        } catch (err) {
            error.addError("Error getting truck by registration");
            throw error;
        }
    }

    async getTrucks(): Promise<TruckDTO[]> {
        const error = getDataErrorFactory();

        try {
            const truck = await this.truckRepository.getData() as Truck[];
            return convertToObjDTO(truck);
        } catch (err) {
            error.addError(String(err));
            throw error;
        }
    }

    async updateTruckByRegistration(registration: string, truckDTO: TruckDTO): Promise<TruckDTO> {
        const error = persistanceErrorFactory();

        try {

            const updated = await this.truckRepository.updateDataById(registration, truckDTO);
            return TruckMap.toDTO(updated as Truck);
        } catch (err) {
            error.addError("Error updating truck");
            throw error;
        }
    }
}

function convertToObjDTO(truckList: Truck[]): TruckDTO[] {
    const truckDTOList: TruckDTO[] = [];
    truckList.forEach(truck => {
        truckDTOList.push(TruckMap.toDTO(truck));
    });
    return truckDTOList;
}