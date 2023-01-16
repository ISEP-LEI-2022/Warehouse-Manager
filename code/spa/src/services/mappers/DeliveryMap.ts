import Delivery from "@/models/delivery";
import Product from "@/models/product";
import type DeliveryDTO from "../dtos/DeliveryDTO";

export default class DeliveryMap {
  public static fromDTOArray(deliveries: Array<DeliveryDTO>): Delivery[] {
    const deliveryList: Delivery[] = [];
    for (const delivery of deliveries) {
        deliveryList.push(
        new Delivery(
          delivery.id,
          delivery.deliveryDate,
          delivery.deliveryWeight,
          delivery.finalStorageId,
          delivery.timeToLoad,
          delivery.timeToUnload,
          delivery.products
        )
      );
    }
    return deliveryList;

  }

  public static fromAnyArray(delivery: Array<any>): Delivery {
    let obj = Object.assign({}, ...delivery.map((x) => ({ [x.name]: x.value })));
    return new Delivery(obj.id, obj.deliveryDate, obj.deliveryWeight, obj.finalStorageId, obj.timeToLoad, obj.timeToUnload, obj.products);
  }

  public static toJson(delivery: Delivery): string {
    return JSON.stringify({
      Id: delivery.DeliveryId,
      DeliveryDate: new Date(delivery.DeliveryDate),
      DeliveryWeight: Number(delivery.DeliveryWeight),
      FinalStorageId: delivery.FinalStorage,
      TimeToLoad: Number(delivery.TimeToLoad),
      TimeToUnload: Number(delivery.TimeToUnload),
      Products: delivery.Products,
    }, null, "\t");
  }

  public static fromDTO(deliveryDTO: DeliveryDTO): Delivery {
    return new Delivery(
      deliveryDTO.id,
      deliveryDTO.deliveryDate,
      deliveryDTO.deliveryWeight,
      deliveryDTO.finalStorageId,
      deliveryDTO.timeToLoad,
      deliveryDTO.timeToUnload,
      deliveryDTO.products
    )
  }


  public static empty(): Delivery {
    var products: Product[] = [];
    return new Delivery("","",0,"",0,0,products);
  }

  public static emptyProduct(): Product {
    return new Product("",0,0,"");
  }

}