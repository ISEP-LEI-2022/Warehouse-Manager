import { ClientSession } from "mongoose";
import repository from "../Repository";

export default interface iRouteRepository<T> extends repository<T> {
    defineSession(session: ClientSession): void;
    removeSession(): void;
}