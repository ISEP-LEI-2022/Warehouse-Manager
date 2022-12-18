import Entity from "src/domain/Entity";
import IRepository from "../IRepository";

export default interface ITripRepository<T> extends IRepository<T> {
    getTripByRegDate(registration: string, date: Date): Promise<Entity<string>>;
    existsTripRegDate(registration: string, date: Date): Promise<boolean>;
}