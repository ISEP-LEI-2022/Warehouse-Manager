import { ClientSession } from "mongoose";
import { Service } from "typedi";
import iRouteRepository from "./IRouteRepository";

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

    async persists(route: Route):
}