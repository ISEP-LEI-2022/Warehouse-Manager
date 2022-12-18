export default class Product {
    Name: string;
    Weight: number;
    LevelOfPolution: number;
    Delivery: string;

    constructor(name: string, weight: number, levelOfPolution: number, delivery: string) {
        this.Name = name;
        this.Weight = weight;
        this.LevelOfPolution = levelOfPolution;
        this.Delivery = delivery;
    }
}