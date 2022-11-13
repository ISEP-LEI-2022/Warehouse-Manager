import mongoose, {
  ClientSession
} from "mongoose";
import { Service } from "typedi";
import IRouteRepository from "./IRouteRepository";
import { Route } from "../../../domain/aggregates";
import {
  getDataErrorFactory,
  persistanceErrorFactory,
} from "../../../domain/utils/Err";
import RouteMap from "../../mappers/RouteMap";
import { RouteMongoose } from "../../schemas/RouteSchema";
import RouteDTO from "domain/dto/RouteDTO";
import Entity from "domain/Entity";


@Service()
export default class RouteRepository implements IRouteRepository<string> {
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
      error.addError("Error persisting data");
      throw error;
    }
  }

  async exists(identifier: string): Promise<boolean> {
    if (this.session) {
      return await !!RouteMongoose.exists({ id: identifier }).session(
        this.session
      );
    } else {
      return await !!RouteMongoose.exists({ id: identifier });
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

  async getDataById(identifier: string): Promise<Entity<string>[]> {
    const error = getDataErrorFactory();
    let data: mongoose.Document[] = [];
    try {
      data = await RouteMongoose.find({idRoute: identifier}).session(this.session);
      return convertToObject(data);

    } catch (err) {
      error.addError("Error searching data");
      throw error;
    }
  }
}

function convertToObject(list: mongoose.Document[]): Route[] {
    let routeList: Route[] = [];
    for (const li of list){
        var jsonData:any = li.toJSON();

        routeList = [...routeList, RouteMap.toDomain(jsonData)];
    }
    return routeList;
}
