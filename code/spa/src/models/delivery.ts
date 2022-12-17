import type Product from "./product";

export default class Delivery {
    DeliveryDate: string;
    DeliveryWeight: number;
    FinalStorage: string;
    TimeToLoad: number;
    TimeToUnload: number;
    Products: Array<Product>;

    constructor(deliveryDate: string, deliveryWeight: number, finalStorage: string, timeToLoad: number, timetoUnload: number, products: Array<Product>) {
        this.DeliveryDate = deliveryDate;
        this.DeliveryWeight = deliveryWeight;
        this.FinalStorage = finalStorage;
        this.TimeToLoad = timeToLoad;
        this.TimeToUnload = timetoUnload
        this.Products = products;
    }
}