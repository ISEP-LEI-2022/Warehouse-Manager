import { Service } from "typedi";
import mongoose, { ClientSession } from "mongoose";
import {
  getDataErrorFactory,
  persistanceErrorFactory,
} from "../../../domain/utils/Err";
import TripMap from "../../../infrastructure/mappers/TripMap";
import { Trip } from "../../../domain/aggregates";
import { TripMongoose } from "../../../infrastructure/schemas/TripSchema";
import Entity from "../../../domain/Entity";
import TripDTO from "../../../domain/dto/TripDTO";
import ITripRepository from "./ITripRepository";

@Service()
export default class TripRepository implements ITripRepository<string> {
  private session: ClientSession | null;
  constructor() {}

  defineSession(session: ClientSession): void {
    if (!session.inTransaction()) {
      throw TypeError("Session must be in trasaction");
    }
    this.session = session;
  }

  removeSession(): void {
    this.session = null;
  }

  async persists(trip: Trip): Promise<mongoose.Document> {
    const error = persistanceErrorFactory();

    const schemaTrip = TripMap.toPersistence(trip);

    try {
      const tripDocument = new TripMongoose(schemaTrip);
      const saved = await tripDocument.save({ session: this.session });
      return saved;
    } catch (err) {
      error.addError("Error persisting data");
      throw error;
    }
  }

  async exists(identifier: string): Promise<boolean> {
    if (this.session) {
      return !!(await TripMongoose.exists({ idTrip: identifier }).session(
        this.session
      ));
    } else {
      return !!(await TripMongoose.exists({ idTrip: identifier }));
    }
  }

  async existsTripRegDate(registration:string, date:Date): Promise<boolean> {
    if (this.session) {
      return !!(await TripMongoose.exists({ registration:registration,date:date }).session(
        this.session
      ));
    } else {
      return !!(await TripMongoose.exists({ registration:registration,date:date }));
    }
  }

  async getData(): Promise<Entity<string>[]> {
    const error = getDataErrorFactory();
    let data: mongoose.Document[] = [];
    try {
      data = await TripMongoose.find().session(this.session);
      return convertToObject(data);
    } catch (err) {
      error.addError("Error searching data");
      throw error;
    }
  }

  async getDataByPagination(page:number, pageRecords:number): Promise<Entity<string>[]> {
    const error = getDataErrorFactory();
    let data: mongoose.Document[] = [];
    try {
      data = await TripMongoose.find().skip((page-1)*pageRecords).limit(pageRecords).session(this.session);
      return convertToObject(data);
    } catch (err) {
      error.addError("Error searching data");
      throw error;
    }
  }

  async getDataById(identifier: string): Promise<Entity<string>> {
    const error = getDataErrorFactory();
    try {
      const data = await TripMongoose.findOne({ idTrip: identifier })
        .session(this.session)
        .orFail();
      return TripMap.toDomain(data);
    } catch (err) {
      error.addError("Error searching data");
      throw error;
    }
  }

  async getTripByRegDate(registration: string, date: Date ): Promise<Entity<string>> {
    const error = getDataErrorFactory();
    try {
      const data = await TripMongoose.findOne({ registration: registration, date: date })
        .session(this.session)
        .orFail();
      return TripMap.toDomain(data);
    } catch (err) {
      error.addError("No trip found for this registration and date");
      throw error;
    }
  }

  async updateDataById(
    identifier: string,
    data: TripDTO
  ): Promise<Entity<string>> {
    const error = persistanceErrorFactory();
    try {
      const route = await TripMongoose.findOneAndUpdate(
        { idTrip: identifier },
        data,
        {
          new: true,
        }
      ).orFail();

      const res = TripMap.toDomain(route);
      return res;
    } catch (err) {
      error.addError("Error updating data");
      throw error;
    }
  }
}

function convertToObject(list: mongoose.Document[]): Trip[] {
  let tripList: Trip[] = [];
  for (const li of list) {
    const jsonData: any = li.toJSON();

    tripList = [...tripList, TripMap.toDomain(jsonData)];
  }
  return tripList;
}
