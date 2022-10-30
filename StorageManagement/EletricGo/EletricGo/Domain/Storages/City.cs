using EletricGo.Domain.Shared;

namespace EletricGo.Domain.Storages
{
    public class City : Entity<CityId>
    {
        public int Number { get; private set; }
        public string Name { get; set; }

        public City(int number, string name)
        {
            Id = new CityId(Guid.NewGuid());
            Number = number;
            Name = name;
        }
    }
}
