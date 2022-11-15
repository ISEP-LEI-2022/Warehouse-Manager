
using EletricGo.Domain.Storages;

namespace EletricGo.Domain.Deliveries
{
    public class CreatingDeliveryDto
    {
        public DateTime DeliveryDate { get; set; }
        public double DeliveryWeight { get; set; }
        public Storage FinalStorageId { get; set; }
        public double TimeToLoad { get; set; }
        public double TimeToUnload { get; set; }
        public List<Product>? Products { get; set; }
        public CreatingDeliveryDto(DateTime deliveryDate, double deliveryWeight, Storage stor, double timeToLoad, double timeToUnload, List<Product> products) {
            DeliveryDate = deliveryDate;
            DeliveryWeight = deliveryWeight;
            FinalStorageId = stor;
            TimeToLoad = timeToLoad;
            TimeToUnload = timeToUnload;
            Products = products;
        }
    }
}
