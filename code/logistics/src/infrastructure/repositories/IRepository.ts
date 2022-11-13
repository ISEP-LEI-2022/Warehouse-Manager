import { ClientSession } from "mongoose";
import Repository from "./Repository";

export default interface IRepository<T> extends Repository<T> {
    defineSession(session: ClientSession): void;
    removeSession(): void;
}