using EletricGo.Domain.Shared;
using System.Xml.Linq;

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

        public void changeLatitude(string latitude)
        {
            Latitude = latitude;
        }

        public void changeLongitude(string longitude)
        {
            Longitude = longitude;
        }

        public void changeAltitude(string altitude)
        {
            Altitude = altitude;
        }

        public void changeAddress(Address address)
        {
            Address.changeStreet(address.Street);
            Address.changeDoor(address.Door);
            Address.changeFloor(address.Floor);
            Address.changePostalCode(address.PostalCode);
            Address.changeCity(address.City);
        }

    }
}
