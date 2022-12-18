import type Product from "@/models/product";

export default interface DeliveryDTO {
    id: string,
    deliveryDate: string,
    deliveryWeight: number,
    finalStorageId: string,
    timeToLoad: number,
    timeToUnload: number,
    products: Array<Product>
}