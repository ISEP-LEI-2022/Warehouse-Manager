import IRepository from "../IRepository";

export default interface IRouteRepository<T> extends IRepository<T> {
    existsSlice(idStart: string, idEnd: string): Promise<boolean>;
}