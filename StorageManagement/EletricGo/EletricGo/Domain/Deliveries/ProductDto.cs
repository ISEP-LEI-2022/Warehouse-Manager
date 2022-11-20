using Microsoft.AspNetCore.Routing.Constraints;

namespace EletricGo.Domain.Deliveries
{
    public class ProductDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public double Weight { get; set; }
        public float LevelOfPolution { get; set; }

        public ProductDto(Guid id, string name, double weight, float levelOfPolution)
        {
            this.Id = id;
            this.Name = name;
            this.Weight = weight;
            this.LevelOfPolution = levelOfPolution;
        }
    }
}
