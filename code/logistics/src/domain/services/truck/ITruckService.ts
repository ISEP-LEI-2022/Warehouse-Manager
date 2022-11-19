import TruckDTO from "../../dto/TruckDTO";

export default interface ITruckService {
  createTruck(truck: TruckDTO): Promise<TruckDTO>;
  getTruckByRegistration(registration: string): Promise<TruckDTO>;
  getTrucks(): Promise<TruckDTO[]>;
  updateTruckByRegistration(registration: string, truck: TruckDTO): Promise<TruckDTO>;
}
