using EletricGo.Domain.Shared;

namespace EletricGo.Domain.Deliveries {
    public class Product : Entity<ProductId> {
        public string Name { get; set; }
        public double Weight { get; set; }
        public float LevelOfPolution { get; set; }
        public Delivery? Delivery { get; set; }
        public DeliveryId? DeliveryId { get; set; }


        public Product() {
        }

        public Product(string name, double weight, float levelOfPolution) {
            Id = new ProductId(Guid.NewGuid());
            Name = name;
            Weight = weight;
            LevelOfPolution = levelOfPolution;
        }

        //public Product(string name, double weight, float levelOfPolution, DeliveryId deliveryId) {
        //    Id = new ProductId(Guid.NewGuid());
        //    Name = name;
        //    Weight = weight;
        //    LevelOfPolution = levelOfPolution;
        //    DeliveryId = deliveryId;
        //}

    }
}
