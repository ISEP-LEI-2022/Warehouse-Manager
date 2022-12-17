import type ChargingSystems from "@/models/chargingSystem";

export default interface StorageDTO {
    idStorage: string;
    designation: string;
    location: Location;
    chargingSystem: Array<ChargingSystems>;
}