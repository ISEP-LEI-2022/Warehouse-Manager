using EletricGo.Domain.Storages;

namespace EletricGo.Domain.Deliveries {
    public class DeliveryDto {
        public Guid Id { get; set; }
        public DateTime DeliveryDate { get; set; }
        public double DeliveryWeight { get; set; }
        public Guid FinalStorageId { get; set; }
        public double TimeToLoad { get; set; }
        public double TimeToUnload { get; set; }
        public List<ProductDto>? Products { get; set; }

        public DeliveryDto(Guid id, DateTime deliveryDate, double deliveryWeight, Guid finalStorageId, double timeToLoad, double timeToUnload, List<ProductDto> products) {
            this.Id = id;
            this.DeliveryDate = deliveryDate;
            this.DeliveryWeight = deliveryWeight;
            this.FinalStorageId = finalStorageId;
            this.TimeToLoad = timeToLoad;
            this.TimeToUnload = timeToUnload;
            this.Products = products;
        }
    }
}
