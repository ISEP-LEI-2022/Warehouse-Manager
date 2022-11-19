using EletricGo.Domain.Storages;

namespace EletricGo.Domain.Deliveries {
    public class DeliveryDto {
        public Guid Id { get; set; }
        public DateTime DeliveryDate { get; set; }
        public double DeliveryWeight { get; set; }
        public Storage FinalStorageId { get; set; }
        public double TimeToLoad { get; set; }
        public double TimeToUnload { get; set; }
        public List<Product>? Products { get; set; }

        public DeliveryDto(Guid id, DateTime deliveryDate, double deliveryWeight, Storage stor, double timeToLoad, double timeToUnload, List<Product> products) {
            Id = id;
            DeliveryDate = deliveryDate;
            DeliveryWeight = deliveryWeight;
            FinalStorageId = stor;
            TimeToLoad = timeToLoad;
            TimeToUnload = timeToUnload;
            Products = products;
        }
    }
}
