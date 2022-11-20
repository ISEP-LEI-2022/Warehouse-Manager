import { Inject, Service } from "typedi";
import config from "../../../config";
import ITruckService from "../../../domain/services/truck/ITruckService";
import { validateRequestParams } from "../../../domain/utils/UtilityFunctions";
import {
  ITruckController,
  expectedTruckJSON,
  expectedBodyTruck
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
  ) { }

  /**
   * Returns all the trucks that exist
   * @returns JSON with all the trucks
   */
  @Get("/")
  public async getTrucks(): Promise<expectedTruckJSON[]> {
    const truckDTO = await this.truckService.getTrucks();
    return TruckMap.toJSONArray(truckDTO);
  }

  /**
   * Gets a truck by its registration
   * @param registration - The registration of the truck
   * @returns Returns a JSON with the truck if its found else returns an error
   */
  @Get("/:registration")
  public async getTruckByRegistration(
    @Path() registration: string
  ): Promise<expectedTruckJSON> {
    const truckDTO = await this.truckService.getTruckByRegistration(
      registration
    );
    return TruckMap.toJSON(truckDTO);
  }

  /**
   * Creates a truck from the given body and returns the created truck
   * @returns {expectedBodyTruck} Returns a JSON with the created truck
   */
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

  /**
   * Will update a truck with the given body else if there is no truck with the given registration it will create a new truck
   * @param body - Truck body
   * @returns Returns a JSON with the updated truck
   */
  @Put("/")
  async updateTruck(
    @Body() body: expectedBodyTruck
  ): Promise<expectedTruckJSON> {
    //Registration is the only required parameter to update a truck
    if (
      !validateRequestParams(
        body,
        ["registration"],
        ["tare", "capacity", "autonomy"]
      )
    ) {

      const error = badRequestErrorFactory();
      error.addError("Invalid request body");
      throw error;
    }
    const truckDTO = await this.truckService.updateTruckByRegistration(body as TruckDTO);
    return TruckMap.toJSON(truckDTO);
  }
}
