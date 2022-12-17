export default class Delivery {
    DeliveryDate: string;
    DeliveryWeight: number;
    TimeToLoad: number;
    TimeToUnload: number;

    constructor(deliveryDate: string, deliveryWeight: number, timeToLoad: number, timetoUnload: number) {
        this.DeliveryDate = deliveryDate;
        this.DeliveryWeight = deliveryWeight;
        this.TimeToLoad = timeToLoad;
        this.TimeToUnload = this.TimeToUnload;
    }
}