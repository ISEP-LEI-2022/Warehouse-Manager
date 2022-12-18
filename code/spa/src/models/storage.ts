
import { registerRuntimeCompiler } from "vue";
import Address from "./address";
import type ChargingSystems from "./chargingSystem";
import City from "./city";
import Location from "./location";

export default class Storage {
    StorageId?: string
    Designation: string;
    Latitude: string;
    Longitude: string;
    Altitude: string;
    Street: string;
    Door: string;
    Floor: string;
    PostalCode: string;
    Number: number;
    Name: string;
    Chargingsystems: Array<ChargingSystems>;




    constructor(storageId: string, designation: string, latitude: string, longitude: string, altitude: string, street:string, door: string, floor: string, postalCode: string, number: number, name: string, chargingSystems: Array<ChargingSystems>) {
        this.StorageId = storageId;
        this.Designation = designation;
        this.Latitude = latitude;
        this.Longitude = longitude;
        this.Altitude = altitude,
        this.Street = street,
        this.Door = door;
        this.Floor = floor;
        this.PostalCode = postalCode,
        this.Number = number,
        this.Name = name;
        this.Chargingsystems = chargingSystems;
    }
}
  