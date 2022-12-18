import type ChargingSystems from "@/models/chargingSystem";

export default interface StorageDTO {
    id: string;
    designation: string;
    //location: Location;
    location: 
    {
      latitude: string,
      longitude: string,
      altitude: string,
      address: {
        street: string,
        door: string,
        floor: string,
        postalCode: string
        city: {
            number: number,
            name: string
        }
      }
    }
  ,
    chargingSystems: Array<ChargingSystems>;



}


