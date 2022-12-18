

using EletricGo.Domain.Shared;
using EletricGo.Domain.Storages;

namespace EletricGo.Domain.Deliveries {
    public class Delivery : Entity<DeliveryId>, IAggregateRoot {
        public DateTime DeliveryDate { get; set; }  
        public double DeliveryWeight { get; set; }
        public StorageId FinalStorageId { get; set; }
        public Storage FinalStorage { get; set; }
        public double TimeToLoad { get; set; }
        public double TimeToUnload { get; set; }
        public List<Product>? Products { get; set; }
        public bool Active { get; private set; }

        public Delivery() { }

        public Delivery(DateTime deliveryDate, double deliveryWeight, StorageId finalStorageId, double timeToLoad, double timeToUnload, List<Product>? products)
        {
            this.Id = new DeliveryId(Guid.NewGuid());
            this.DeliveryDate = deliveryDate;
            this.DeliveryWeight = deliveryWeight;
            this.TimeToLoad = timeToLoad;
            this.TimeToUnload = timeToUnload;
            this.FinalStorageId = finalStorageId;
            this.Products = new List<Product>();
            if (products?.Any() == true) {
                foreach (var product in products) {
                    var newProduct = new Product(product.Name, product.Weight, product.LevelOfPolution);
                    this.Products.Add(newProduct);
                }
            }
            this.Active = true;
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

        public void changeProducts(List<Product> products) {
            if (products?.Any() == true) {
                foreach (var product in products) {
                    var newProduct = new Product(product.Name, product.Weight, product.LevelOfPolution);
                    this.Products.Add(newProduct);
                }
            }


        }
    }
}
