export default interface DeliveryDTO {
    idDelivery: string,
    deliveryDate: string,
    deliveryWeight: number,
    idFinalStorage: string,
    timeToLoad: number,
    timeToUnload: number
}