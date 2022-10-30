using EletricGo.Domain.Shared;

namespace EletricGo.Domain.Storages
{
    public class Location : Entity<LocationId>
    {
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string Altitude { get; set; }
        public Address? Address { get; set; }


        public Location() {
        }

        public Location(string latitude, string longitude, string altitude, Address addr)
        {
            Id = new LocationId(Guid.NewGuid());
            Latitude = latitude;
            Longitude = longitude;
            Altitude = altitude;
            if(addr != null) 
                Address = new Address(addr.Street, addr.Door, addr.Floor, addr.PostalCode, addr.City); 
        }
    }
}
