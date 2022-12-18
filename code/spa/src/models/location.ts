import type Address from "./address";

export default class Location {
    Latitude: string;
    Longitude: string;
    Altitude: string;
    Address: Address;

    constructor(latitude: string, longitude: string, altitude: string, address: Address) {
        this.Latitude = latitude;
        this.Longitude = longitude;
        this.Altitude = altitude;
        this.Address = address;
    }
}