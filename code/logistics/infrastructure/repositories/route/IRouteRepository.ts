import { ClientSession } from "mongoose";
import Repository from "../Repository";

export default interface IRouteRepository<T> extends Repository<T> {
    defineSession(session: ClientSession): void;
    removeSession(): void;
}