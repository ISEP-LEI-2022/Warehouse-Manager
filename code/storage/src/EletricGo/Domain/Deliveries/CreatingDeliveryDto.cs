
using EletricGo.Domain.Storages;

namespace EletricGo.Domain.Deliveries
{
    public class CreatingDeliveryDto
    {
        public DateTime DeliveryDate { get; set; }
        public double DeliveryWeight { get; set; }
        public string FinalStorageId { get; set; }
        public double TimeToLoad { get; set; }
        public double TimeToUnload { get; set; }
        public List<Product> Products { get; set; }

        public CreatingDeliveryDto() {

        }
        public CreatingDeliveryDto(DateTime deliveryDate, double deliveryWeight, string finalStorageId, double timeToLoad, double timeToUnload, List<Product> products) {
            this.DeliveryDate = deliveryDate;
            this.DeliveryWeight = deliveryWeight;
            this.FinalStorageId = finalStorageId;
            this.TimeToLoad = timeToLoad;
            this.TimeToUnload = timeToUnload;
            this.Products = products;
        }
    }
}
