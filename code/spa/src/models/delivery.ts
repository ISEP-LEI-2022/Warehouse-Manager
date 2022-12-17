export default class Delivery {
    DeliveryDate: string;
    DeliveryWeight: number;
    FinalStorage: string;
    TimeToLoad: number;
    TimeToUnload: number;

    constructor(deliveryDate: string, deliveryWeight: number, finalStorage: string, timeToLoad: number, timetoUnload: number) {
        this.DeliveryDate = deliveryDate;
        this.DeliveryWeight = deliveryWeight;
        this.FinalStorage = finalStorage;
        this.TimeToLoad = timeToLoad;
        this.TimeToUnload = timetoUnload
    }
}