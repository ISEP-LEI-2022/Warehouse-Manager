import Entity from "../../domain/Entity";
import mongoose, { ClientSession } from "mongoose";
import Repository from "./Repository";

export default interface IRepository<T> extends Repository<T> {
    defineSession(session: ClientSession): void;
    removeSession(): void;
    getData(): Promise<Entity<string>[]>;
    getDataByPagination(page:number, pageRecords:number): Promise<Entity<string>[]>;
    getDataById(id: string): Promise<Entity<string>>;
    updateDataById(id: string, data: object): Promise<Entity<string>>;
}