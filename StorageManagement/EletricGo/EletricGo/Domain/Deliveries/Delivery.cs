

using EletricGo.Domain.Shared;
using EletricGo.Domain.Storages;

namespace EletricGo.Domain.Deliveries {
    public class Delivery : Entity<DeliveryId>, IAggregateRoot {
        public DateTime DeliveryDate { get; set; }  
        public double DeliveryWeight { get; set; }
        public Storage FinalStorageId { get; set; }
        public double TimeToLoad { get; set; }
        public double TimeToUnload { get; set; }
        public List<Product>? Products { get; set; }

        public Delivery() { }

        public Delivery(DateTime deliveryDate, double deliveryWeight, Storage stor, double timeToLoad, double timeToUnload, List<Product> products)
        {
            this.Id = new DeliveryId(Guid.NewGuid());
            this.DeliveryDate = deliveryDate;
            this.DeliveryWeight = deliveryWeight;
            this.TimeToLoad = timeToLoad;
            this.TimeToUnload = timeToUnload;
            //FinalStorage = new StorageId(Guid.NewGuid());
            FinalStorageId = new Storage(stor.Designation, stor.Location, stor.ChargingSystems);
            Products = new List<Product>();
            for (int i = 0; i < products.Count; i++)
            {
                Products.Add(new Product(products[i].Name, products[i].LevelOfPolution, products[i].LevelOfPolution));

            }
        }

        public void changeDeliveryDate(DateTime deliveryDate)
        {
            DeliveryDate = deliveryDate;
        }

        public void changeDeliveryWeight(double deliveryWeight)
        {
            DeliveryWeight = deliveryWeight;
        }

        public void changeTimeToUnload(double timeToUnload)
        {
            TimeToUnload = timeToUnload;
        }

        public void changeTimeToLoad(double timeToLoad)
        {
            TimeToLoad = timeToLoad;
        }
    }
}
