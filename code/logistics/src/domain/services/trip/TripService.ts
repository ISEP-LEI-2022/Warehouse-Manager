import { ClientSession } from "mongoose";
import { Trip } from "../../aggregates";
import TripDTO from "../../dto/TripDTO";
import {
  businessRuleErrorFactory,
  getDataErrorFactory,
} from "../../utils/Err";
import TripMap from "../../../infrastructure/mappers/TripMap";
import { Inject, Service } from "typedi";
import config from "../../../config";
import ITripRepository from "../../../infrastructure/repositories/IRepository";
import ITripService from "./ITripService";

@Service()
export default class TripService implements ITripService {
  private session: ClientSession | null;

  constructor(
    @Inject(config.repositories.TripRepository.name)
    private tripRepository: ITripRepository<string>
  ) {
    this.session;
  }

  async createTrip(tripDTO: TripDTO): Promise<TripDTO> {
    const error = businessRuleErrorFactory();

    try {
      const trip = TripMap.toDomain(tripDTO);
      !!(await this.tripRepository.exists(tripDTO.idTrip)) === true
        ? error.addError("Trip with this idTrip already exists")
        : await this.tripRepository.persists(trip);
      if (error.hasErrors()) throw error;

      return tripDTO;
    } catch (err) {
      throw err;
    }
  }

  async getTripById(id: string): Promise<TripDTO> {
    const error = getDataErrorFactory();

    try {
      const trip = (await this.tripRepository.getDataById(id)) as Trip;
      return TripMap.toDTO(trip);
    } catch (err) {
      error.addError("Error getting trip by id");
      throw error;
    }
  }

  async getTrips(): Promise<TripDTO[]> {
    const error = getDataErrorFactory();

    try {
      const trip = (await this.tripRepository.getData()) as Trip[];
      return convertToObjDTO(trip);
    } catch (err) {
      error.addError("Error getting trips");
      throw error;
    }
  }

  async updateTripById(tripDTO: TripDTO): Promise<TripDTO> {
    const error = businessRuleErrorFactory();

    try {
      const updated = await this.tripRepository.updateDataById(tripDTO.idTrip,tripDTO);
      return TripMap.toDTO(updated as Trip);
    } catch (err) {
      error.addError("Error updating truck");
      throw error;
    }
  }
}

function convertToObjDTO(tripList: Trip[]): TripDTO[] {
  const tripDTOList: TripDTO[] = [];
  tripList.forEach((route) => {
    tripDTOList.push(TripMap.toDTO(route));
  });
  return tripDTOList;
}