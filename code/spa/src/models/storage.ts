import type ChargingSystems from "./chargingSystem";

export default class Storage {
    Designation: string;
    Location: Location;
    Chargingsystems: Array<ChargingSystems>;

    constructor(designation: string, location:Location, chargingSystems: Array<ChargingSystems>) {
        this.Designation = designation;
        this.Location = location;
        this.Chargingsystems = chargingSystems;
    }
}
  