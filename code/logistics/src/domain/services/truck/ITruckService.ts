import TruckDTO from "../../dto/TruckDTO";

export default interface ITruckService {
  createTruck(truck: TruckDTO): Promise<TruckDTO>;
  getTruckByRegistration(id: string): Promise<TruckDTO>;
  getTrucks(): Promise<TruckDTO[]>;
  updateTruckById(truck: TruckDTO): Promise<TruckDTO>;
}
