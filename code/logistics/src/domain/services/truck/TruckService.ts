import { ClientSession } from "mongoose";
import { Inject, Service } from "typedi";
import config from "../../../config";
import ITruckService from "./ITruckService";
import ITruckRepository from "../../../infrastructure/repositories/IRepository";
import TruckDTO from "../../dto/TruckDTO";
import { businessRuleErrorFactory } from "../../utils/Err";
import TruckMap from "../../../infrastructure/mappers/TruckMap";

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
    console.log(truckDTO.registration);
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
}
