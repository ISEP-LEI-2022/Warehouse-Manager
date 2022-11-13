import { Inject, Service } from 'typedi';
import config from '../../../config';
import ITruckService from '../../../domain/services/truck/ITruckService';
import { validateRequestParams } from '../../../domain/utils/UtilityFunctions';
import {ITruckController} from './ITruckController';
import {badRequestErrorFactory} from "../../../domain/utils/Err";
import TruckDTO from '../../../domain/dto/TruckDTO';
import TruckMap from '../../../infrastructure/mappers/TruckMap';
import { Post, Route } from "tsoa";

@Route("Trucks")
@Service()
export default class TruckController implements ITruckController {
    constructor(
        @Inject(config.services.TruckService.name)
            private truckService: ITruckService
        ) {}

        @Post()
        async createTruck(body: object): Promise<any> {
        if (!validateRequestParams(body, ['registration', 'tare', 'capacity', 'autonomy'])) {
            const error = badRequestErrorFactory()
            error.addError('Invalid request body')
            throw error
        }

        const truckDTO = await this.truckService.createTruck(body as TruckDTO);
        return TruckMap.toJSON(truckDTO);

        }
}