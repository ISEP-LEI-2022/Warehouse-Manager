import TruckDTO from "../../dto/TruckDTO";

export default interface ITruckService {
  createTruck(route: TruckDTO): Promise<TruckDTO>;
}