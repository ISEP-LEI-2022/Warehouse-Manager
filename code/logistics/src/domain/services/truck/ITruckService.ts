import TruckDTO from "../../dto/TruckDTO";

export default interface ITruckService {
  createTruck(truck: TruckDTO): Promise<TruckDTO>;
  getTruckByRegistration(id: string): Promise<TruckDTO>;
  getTrucks(): Promise<TruckDTO[]>;
  updateTruckByRegistration(truck: TruckDTO): Promise<TruckDTO>;
  changeActiveStatus(id: string): Promise<TruckDTO>;
}
