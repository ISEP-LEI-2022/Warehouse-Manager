import config from "../../../config";
import TripDTO from "../../../domain/dto/TripDTO";
import ITripService from "../../../domain/services/trip/ITripService";
import { badRequestErrorFactory } from "../../../domain/utils/Err";
import { validateRequestParams } from "../../../domain/utils/UtilityFunctions";
import TripMap from "../../../infrastructure/mappers/TripMap";
import { Body, Get, Path, Post, Put, Query, Route, Tags } from "tsoa";
import { Inject, Service } from "typedi";
import {
  expectedBodyTrip,
  expectedTripJSON,
  ITripController,
} from "./ITripController";

@Route("/trips")
@Tags("Trips")
@Service()
export default class TripController implements ITripController {
  constructor(
    @Inject(config.services.TripService.name)
    private tripService: ITripService
  ) {}

  /**
   * @summary Returns all the trips that exist
   * @returns JSON with all the trips
   */
  @Get("/")
  public async getTrips(): Promise<expectedTripJSON[]> {
    const tripDTO = await this.tripService.getTrips();
    return TripMap.toJSONArray(tripDTO);
  }

  @Get("/records/pagination/data/")
  public async getTripsByPagination(@Query() page:number, @Query() pageRecords:number): Promise<{tripList: expectedTripJSON[], totalRecords: number}> {
    
    const tripDTO = await this.tripService.getTrips();
    let totalRecords = tripDTO.length;
    const startIndex = (page - 1) * pageRecords;
    const endIndex = startIndex + pageRecords;
    const dataToReturn = tripDTO.slice(startIndex, endIndex);

    const result =  {
      tripList: TripMap.toJSONArray(dataToReturn) as [],
      totalRecords: totalRecords as number
    };
    
    return result;
  }

  /**
   * @summary This method searches for a trip from the given id
   * @param idTrip idTrip of the trip
   * @returns {expectedTripJSON} Returns a JSON with the trip information
   */
  @Get("/:idTrip")
  async getTripById(@Path() idTrip: string): Promise<expectedTripJSON> {
    const tripDTO = await this.tripService.getTripById(idTrip);
    return TripMap.toJSON(tripDTO);
  }

  /**
   * @summary This method searches for a trip from the given registration and date
   * @param registration registration of the truck
   * @param {Date} date of the trip
   * @returns {expectedTripJSON} Returns a JSON with the trip information
   */
  @Get("/:registration/:date")
  async getTripByRegDate(
    @Path() registration: string,
    @Path() date: Date
  ): Promise<expectedTripJSON> {
    const tripDTO = await this.tripService.getTripByRegDate(registration, date);
    return TripMap.toJSON(tripDTO);
  }


  /**
   * @summary Creates a new trip from the given body and returns the created trip
   * @returns {expectedBodyTrip} Returns a JSON with the created trip
   */
  @Post("/")
  async createTrip(@Body() body: expectedBodyTrip): Promise<expectedBodyTrip> {
    if (
      !validateRequestParams(body, [
        "idTrip",
        "registration",
        "date",
        "routes",
        "deliveries",
      ])
    ) {
      const error = badRequestErrorFactory();
      error.addError("Missing parameters");
      throw error;
    }
    const createdTripDTO = await this.tripService.createTrip(body as TripDTO);
    return TripMap.toJSON(createdTripDTO);
  }

  /**
   * @summary Will update a trip with the given body else if there is no trip with the given idTrip it will create a new trip
   * @param idTrip idTrip of the trip
   * @param body body of the trip
   * @returns {expectedBodyTrip} Returns a JSON with the updated trip
   */
  @Put("/")
  async updateTripById(
    @Body() body: expectedBodyTrip
  ): Promise<expectedBodyTrip> {
    if (
      !validateRequestParams(
        body,
        ["idTrip"],
        ["idRoute", "date", "deliveries", "registration"]
      )
    ) {
      const error = badRequestErrorFactory();
      error.addError("Invalid request body");
      throw error;
    }
    const tripDTO = await this.tripService.updateTripById(body as TripDTO);
    return TripMap.toJSON(tripDTO);
  }
}
