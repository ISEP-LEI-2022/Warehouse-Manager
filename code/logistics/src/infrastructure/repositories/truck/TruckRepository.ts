import mongoose, { ClientSession}from "mongoose";
import { Service } from "typedi";
import IRepository from "../IRepository";
import { Truck } from "../../../domain/aggregates";
import { persistanceErrorFactory } from "../../../domain/utils/Err";
import TruckMap from "../../mappers/TruckMap";
import { TruckMongoose } from "../../schemas/TruckSchema";

@Service()
export default class TruckRepository implements IRepository<string> {
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


    async persists(truck: Truck): Promise<mongoose.Document> {
        const error = persistanceErrorFactory();

        const schemaTruck = TruckMap.toPersistence(truck);

        try {
            const truckDocument = new TruckMongoose(schemaTruck)
            const saved = await truckDocument.save({session: this.session});
            return saved;
        }catch(err){
            error.addError(err as string);
            throw error;
        }
    }

    async exists(identifier: string): Promise<boolean> {
        if (this.session){
            return await !!TruckMongoose.exists({id: identifier}).session(this.session);
        }else{
            return await !!TruckMongoose.exists({id: identifier});
        }
    }
}