import type Product from "@/models/product";

export default interface DeliveryDTO {
    idDelivery: string,
    deliveryDate: string,
    deliveryWeight: number,
    idFinalStorage: string,
    timeToLoad: number,
    timeToUnload: number,
    products: Array<Product>
}