import mongoose, { ClientSession } from "mongoose";
import { Service } from "typedi";
import IRepository from "../IRepository";
import { Truck } from "../../../domain/aggregates";
import {
  getDataErrorFactory,
  persistanceErrorFactory,
} from "../../../domain/utils/Err";
import TruckMap from "../../mappers/TruckMap";
import { TruckMongoose } from "../../schemas/TruckSchema";
import Entity from "../../../domain/Entity";
import TruckDTO from "../../../domain/dto/TruckDTO";

@Service()
export default class TruckRepository implements IRepository<string> {
  private session: ClientSession | null;

  defineSession(session: ClientSession): void {
    if (!session.inTransaction()) {
      throw TypeError("Session must be in trasaction");
    }
    this.session = session;
  }

  removeSession(): void {
    this.session = null;
  }

  async persists(truck: Truck): Promise<mongoose.Document> {
    const error = persistanceErrorFactory();

    const schemaTruck = TruckMap.toPersistence(truck);

    try {
      const truckDocument = new TruckMongoose(schemaTruck);
      const saved = await truckDocument.save({ session: this.session });
      return saved;
    } catch (err) {
      if (err instanceof Error) {
        error.addError(err.message);
      }else{
        error.addError("Error persisting data");
      }      
      throw error;
    }
  }

  async exists(registration: string): Promise<boolean> {
    if (this.session) {
      return !!(await TruckMongoose.exists({ registration: registration }).session(
        this.session
      ));
    } else {
      return !!(await TruckMongoose.exists({ registration: registration }));
    }
  }

  public async getData(): Promise<Entity<string>[]> {
    const error = getDataErrorFactory();
    let data: mongoose.Document[] = [];
    try {
      data = await TruckMongoose.find().session(this.session);
      return convertToObject(data);
    } catch (err) {
      error.addError("Error searching data");
      throw error;
    }
  }

  public async getDataByPagination(page:number,pageRecords:number): Promise<Entity<string>[]> {
    const error = getDataErrorFactory();
    let data: mongoose.Document[] = [];
    try {
      data = await TruckMongoose.find().skip((page-1)*pageRecords).limit(pageRecords).session(this.session);

      return convertToObject(data);
    } catch (err) {
      error.addError("Error searching data");
      throw error;
    }
  }

  async getDataById(registration: string): Promise<Entity<string>> {
    const error = getDataErrorFactory();
    try {
      const data = await TruckMongoose.findOne({ registration: registration })
        .session(this.session)
        .orFail();
      return TruckMap.toDomain(data);
    } catch (err) {
      error.addError("Error searching data");
      throw error;
    }
  }

  async updateDataById(
    registration: string,
    data: TruckDTO
  ): Promise<Entity<string>> {
    const error = persistanceErrorFactory();
    try {
      const truck = await TruckMongoose.findOneAndUpdate(
        { registration: registration },
        data,
        {
          new: true,
          upsert: true,
        }
      );

      const res = TruckMap.toDomain(truck);
      return res;
    } catch (err) {
      error.addError("Error updating data");
      throw error;
    }
  }
}

function convertToObject(list: mongoose.Document[]): Truck[] {
  let truckList: Truck[] = [];
  for (const li of list) {
    const jsonData: any = li.toJSON();

    truckList = [...truckList, TruckMap.toDomain(jsonData)];
  }
  return truckList;
}
