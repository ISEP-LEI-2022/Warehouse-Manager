import mongoose, { ClientSession } from "mongoose";
import { Service } from "typedi";
import IRepository from "../IRepository";
import { Route } from "../../../domain/aggregates";
import {
  getDataErrorFactory,
  persistanceErrorFactory,
} from "../../../domain/utils/Err";
import RouteMap from "../../mappers/RouteMap";
import { RouteMongoose } from "../../schemas/RouteSchema";
import Entity from "../../../domain/Entity";
import RouteDTO from "../../../domain/dto/RouteDTO";

@Service()
export default class RouteRepository implements IRepository<string> {
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

  async persists(route: Route): Promise<mongoose.Document> {
    const error = persistanceErrorFactory();

    const schemaRoute = RouteMap.toPersistence(route);

    try {
      const routeDocument = new RouteMongoose(schemaRoute);
      const saved = await routeDocument.save({ session: this.session });
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

  async exists(identifier: string): Promise<boolean> {
    
    if (this.session) {
      return !!(await RouteMongoose.exists({ idRoute: identifier }).session(
        this.session
      ));
    } else {
      return !!await (RouteMongoose.exists({ idRoute: identifier }));
    }
  }

  async getData(): Promise<Entity<string>[]> {
    const error = getDataErrorFactory();
    let data: mongoose.Document[] = [];
    try {
      data = await RouteMongoose.find().session(this.session);
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
      data = await RouteMongoose.find().skip((page-1)*pageRecords).limit(pageRecords).session(this.session);
      return convertToObject(data);
    } catch (err) {
      error.addError("Error searching data");
      throw error;
    }
  }

  async getDataById(identifier: string): Promise<Entity<string>> {
    const error = getDataErrorFactory();
    try {
      const data = await RouteMongoose.findOne({ idRoute: identifier })
        .session(this.session)
        .orFail();
      return RouteMap.toDomain(data);
    } catch (err) {
      error.addError("Error searching data");
      throw error;
    }
  }

  async updateDataById(
    identifier: string,
    data: RouteDTO
  ): Promise<Entity<string>> {
    const error = persistanceErrorFactory();
    try {
      const route = await RouteMongoose.findOneAndUpdate(
        { idRoute: identifier },
        data,
        {
          new: true,
        }
      ).orFail();

      const res = RouteMap.toDomain(route);
      return res;
    } catch (err) {
      error.addError("Error updating data");
      throw error;
    }
  }

  async existsSlice(idStart: string, idEnd: string): Promise<boolean> {
    
    if (this.session) {
      return !!(await RouteMongoose.exists({ idStart: idStart , idEnd:idEnd}).session(
        this.session
      ));
    } else {
      return !!await (RouteMongoose.exists({ idStart: idStart , idEnd:idEnd}));
    }
  }
}

function convertToObject(list: mongoose.Document[]): Route[] {
  let routeList: Route[] = [];
  for (const li of list) {
    const jsonData: any = li.toJSON();

    routeList = [...routeList, RouteMap.toDomain(jsonData)];
  }
  return routeList;
}
