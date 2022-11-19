using EletricGo.Domain.Shared;
using System.Xml.Linq;


namespace EletricGo.Domain.Storages
{
    public class Address : Entity<AddressId>
    {
        public string Street { get; set; }
        public string Door { get; set; }
        public string Floor { get; set; }
        public string PostalCode { get; set; }
        public City? City { get;  set; }

        public Address(string street, string door, string floor, string postalCode, City city)
        {
            Id = new AddressId(Guid.NewGuid());
            Street = street;
            Door = door;
            Floor = floor;
            PostalCode = postalCode;
            City = city;
        }

        public Address()
        {

        }


        public void changeStreet(string street)
        {
            Street = street;
        }

        public void changeDoor(string door)
        {
            Door = door;
        }

        public void changeFloor(string floor)
        {
            Floor = floor;
        }

        public void changePostalCode(string postalCode)
        {
            PostalCode = postalCode;
        }

        public void changeCity(City city)
        {
            City.changeNumber(city.Number);
            City.changeName(city.Name);
        }


    }
}
