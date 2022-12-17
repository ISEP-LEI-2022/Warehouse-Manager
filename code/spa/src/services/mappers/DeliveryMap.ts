import Delivery from "@/models/delivery";
import type DeliveryDTO from "../dtos/DeliveryDTO";

export default class DeliveryMap {
  public static fromDTOArray(deliveries: Array<DeliveryDTO>): Delivery[] {
    const deliveryList: Delivery[] = [];
    for (const delivery of deliveries) {
        deliveryList.push(
        new Delivery(
          delivery.deliveryDate,
          delivery.deliveryWeight,
          delivery.idFinalStorage,
          delivery.timeToLoad,
          delivery.timeToUnload,
          delivery.products
        )
      );
    }
    return deliveryList;

  }
}