import mongoose, { ClientSession, Error, Types }from "mongoose";
import { Service } from "typedi";
import iRouteRepository from "./IRouteRepository";
import {Route} from "../../../domain/aggregates";
import { Err, persistanceErrorFactory } from "domain/utils/Err";
import RouteMap from "../../mappers/RouteMap";
import {RouteMongoose} from "../../schemas/RouteSchema";

@Service("routeRepository")
export default class RouteRepository implements iRouteRepository<string> {
    private session: ClientSession | null;
    constructor() {}

    defineSession(session: ClientSession): void {
        if(!session.inTransaction()){
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
            const routeDocument = new RouteMongoose(schemaRoute)
            const saved = await routeDocument.save({session: this.session});
            return saved;
        }catch(err){
           error.addError(err as string);
           throw error;
        }
    }

    async exists(identifier: string): Promise<boolean> {
        if (this.session){
            return await !!RouteMongoose.exists({id: identifier}).session(this.session);
        }else{
            return await !!RouteMongoose.exists({id: identifier});
        }
    }
}