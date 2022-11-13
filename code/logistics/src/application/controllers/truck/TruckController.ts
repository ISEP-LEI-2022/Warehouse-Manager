import { Inject, Service } from 'typedi';
import config from '../../../config';
import ITruckService from '../../../domain/services/truck/ITruckService';
import { validateRequestParams } from '../../../domain/utils/UtilityFunctions';
import { ITruckController, expectedJSON } from './ITruckController';
import {badRequestErrorFactory} from "../../../domain/utils/Err";
import TruckDTO from '../../../domain/dto/TruckDTO';
import TruckMap from '../../../infrastructure/mappers/TruckMap';
import { Get, Route, Tags,  Post, Body, Path } from "tsoa";



@Service()
@Route("/trucks")
@Tags("Truck")
export default class TruckController implements ITruckController {
    constructor(@Inject(config.services.TruckService.name)
            private truckService: ITruckService) {}

    @Get("/")
    public async getTrucks(): Promise<Array<expectedJSON>> {
        const routeDTO = await this.truckService.getTrucks();
        return TruckMap.toJSONArray(routeDTO);
    }

    @Post("/")
    public async createTruck(@Body() body: expectedJSON): Promise<expectedJSON> {
    if (!validateRequestParams(body, ['registration', 'tare', 'capacity', 'autonomy'])) {
        const error = badRequestErrorFactory()
        error.addError('Invalid request body')
        throw error
    }

    const truckDTO = await this.truckService.createTruck(body as TruckDTO);
    return TruckMap.toJSON(truckDTO);

    }

    @Get("/:registration")
    public async getTruckByRegistration(@Path() registration: string): Promise<expectedJSON[]> {
        const routeDTO = await this.truckService.getTruckByRegistration(registration);
        return TruckMap.toJSONArray(routeDTO);
    }

}