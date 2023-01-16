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
import { Get, Route, Tags, Post, Body, Path, Put, Query, Patch } from "tsoa";

@Route("/trucks")
@Tags("Trucks")
@Service()
export default class TruckController implements ITruckController {
  constructor(
    @Inject(config.services.TruckService.name)
    private truckService: ITruckService
  ) { }

  /**
   * @summary Returns all the trucks that exist
   * @returns JSON with all the trucks
   */
  @Get("/")
  public async getTrucks(): Promise<expectedTruckJSON[]> {
    const truckDTO = await this.truckService.getTrucks();
    return TruckMap.toJSONArray(truckDTO);
  }

  @Get("/pag/ination")
  public async getTrucksByPagination(@Query() page:number, @Query() pageRecords:number): Promise<{trucksList: expectedTruckJSON[], totalRecords: number}> {
    
    const truckDTO = await this.truckService.getTrucksWithPagination(page, pageRecords);

    let totalRecords = await (await this.truckService.getTrucks()).length;

    const result =  {
      trucksList: TruckMap.toJSONArray(truckDTO) as [],
      totalRecords: totalRecords as number
    };
    
    return result;
  }

  /**
   * @summary Gets a truck by its registration
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
   * @summary Creates a truck from the given body and returns the created truck
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
      ],["active"])
    ) {
      const error = badRequestErrorFactory();
      error.addError("Invalid request body");
      throw error;
    }

    const truckDTO = await this.truckService.createTruck(body as TruckDTO);
    return TruckMap.toJSON(truckDTO);
  }

  /**
   * @summary Will update a truck with the given body else if there is no truck with the given registration it will create a new truck
   * @param body - Truck body
   * @returns Returns a JSON with the updated truck
   */
  @Put("/")
  async updateTruckByRegistration(
    @Body() body: expectedBodyTruck
  ): Promise<expectedTruckJSON> {
    //Registration is the only required parameter to update a truck
    if (
      !validateRequestParams(
        body,
        ["registration"],
        ["tare", "capacity", "autonomy","active"]
      )
    ) {

      const error = badRequestErrorFactory();
      error.addError("Invalid request body");
      throw error;
    }
    const truckDTO = await this.truckService.updateTruckByRegistration(body as TruckDTO);
    return TruckMap.toJSON(truckDTO);
  }

  /**
   * @summary Changes the active status of a truck
   * @param registration - The registration of the truck
   * @returns Returns a JSON with the updated truck
   */
  @Patch("/status/:registration")
  async changeActiveStatus(
    @Path() registration: string
  ): Promise<expectedTruckJSON> {
    const truckDTO = await this.truckService.changeActiveStatus(registration);
    return TruckMap.toJSON(truckDTO);
  } 
}
