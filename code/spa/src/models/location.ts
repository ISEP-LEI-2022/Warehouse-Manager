import type Address from "./address";

export default class Location {
    Latitude: string;
    Longitude: string;
    Altitude: number;
    Address: Address;

    constructor(latitude: string, longitude: string, altitude: number, address: Address) {
        this.Latitude = latitude;
        this.Longitude = longitude;
        this.Altitude = altitude;
        this.Address = address;
    }
}