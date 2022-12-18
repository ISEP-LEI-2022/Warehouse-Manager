
import type City from "./city";

export default class Address {
    Street: string;
    Door: string;
    Floor: string;
    PostalCode: string;
    City: City;

    constructor(street: string, door: string, floor: string, postalCode: string, city: City) {
        this.Street = street;
        this.Door = door;
        this.Floor = floor;
        this.PostalCode = postalCode;
        this.City = city;
    }
}