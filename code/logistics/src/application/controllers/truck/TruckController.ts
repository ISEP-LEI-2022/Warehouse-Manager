import { Inject, Service } from "typedi";
import config from "../../../config";
import ITruckService from "../../../domain/services/truck/ITruckService";
import { validateRequestParams } from "../../../domain/utils/UtilityFunctions";
import {
  ITruckController,
  expectedTruckJSON,
  expectedBodyTruck,
} from "./ITruckController";
import { badRequestErrorFactory } from "../../../domain/utils/Err";
import TruckDTO from "../../../domain/dto/TruckDTO";
import TruckMap from "../../../infrastructure/mappers/TruckMap";
import { Get, Route, Tags, Post, Body, Path, Put } from "tsoa";

@Route("/trucks")
@Tags("Trucks")
@Service()
export default class TruckController implements ITruckController {
  constructor(
    @Inject(config.services.TruckService.name)
    private truckService: ITruckService
  ) {}

  @Get("/")
  public async getTrucks(): Promise<Array<expectedTruckJSON>> {
    const routeDTO = await this.truckService.getTrucks();
    return TruckMap.toJSONArray(routeDTO);
  }

  @Post("/")
  public async createTruck(
    @Body() body: expectedBodyTruck
  ): Promise<expectedBodyTruck> {
    if (
      !validateRequestParams(body, [
        "registration",
        "tare",
        "capacity",
        "autonomy",
      ])
    ) {
      const error = badRequestErrorFactory();
      error.addError("Invalid request body");
      throw error;
    }

    const truckDTO = await this.truckService.createTruck(body as TruckDTO);
    return TruckMap.toJSON(truckDTO);
  }

  @Get("/:registration")
  public async getTruckByRegistration(
    @Path() registration: string
  ): Promise<expectedTruckJSON[]> {
    const routeDTO = await this.truckService.getTruckByRegistration(
      registration
    );
    return TruckMap.toJSONArray(routeDTO);
  }

  @Put("/:id")
  async updateTruck(
    @Path() id: string,
    @Body() body: expectedBodyTruck
  ): Promise<expectedTruckJSON> {
    //Any of these parameters is valid to update a route
    if (body.registration !== null && body.registration !== undefined) {
      const error = badRequestErrorFactory();
      error.addError("Cant update the id of a route");
      throw error;
    }
    if (!validateRequestParams(body, ["tare", "capacity", "autonomy"])) {
      const error = badRequestErrorFactory();
      error.addError("Invalid request body");
      throw error;
    }
    const truckDTO = await this.truckService.updateTruckById(
      id,
      body as TruckDTO
    );
    return TruckMap.toJSON(truckDTO);
  }
}
