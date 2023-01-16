using EletricGo.Domain.Deliveries;
using EletricGo.Domain.Shared;

namespace EletricGo.Domain.Storages
{
    public class Storage : Entity<StorageId>, IAggregateRoot
    {
        // Attributes

        public string Designation { get; set; }
        public Location Location { get;  set; }
        public List<ChargingSystem>? ChargingSystems { get; set; }
        public ICollection<Delivery> Deliveries { get; set; }
        public bool Active { get; private set; }

        //Contructors
        public Storage()
        {
        }
        public Storage(string designation, Location loc, List<ChargingSystem>? chargingSystems)
        {
            this.Id = new StorageId(Guid.NewGuid());
            this.Designation = designation;
            this.Active = true;
            this.Location = new Location(loc.Latitude, loc.Longitude, loc.Altitude, loc.Address);
            this.ChargingSystems = new List<ChargingSystem>();
            if (chargingSystems?.Any() == true) {
                foreach (var chargingSystem in chargingSystems)
                {
                    var newChargingSystem = new ChargingSystem(chargingSystem.ChargingTime);
                    this.ChargingSystems.Add(newChargingSystem);
                }
            }
            
        } 


        // Methods

        public void changeDesignation(string designation)
        {
            this.Designation = designation;
        }

        public void changeActive(bool active)
        {
            this.Active = active;
        }
        public void changeLocation(Location location)
        {
            Location.changeLatitude(location.Latitude);
            Location.changeLongitude(location.Longitude);
            Location.changeAltitude(location.Altitude);
            Location.changeAddress(location.Address);
        }
        public void changeChargingSystems(List<ChargingSystem> chargingSystems)
        {
            if (chargingSystems?.Any() == true)
            {
                this.ChargingSystems.Clear();
                foreach (var chargingSystem in chargingSystems)
                {
                    var newChargingSystem = new ChargingSystem(chargingSystem.ChargingTime);
                    this.ChargingSystems.Add(newChargingSystem);
                }

            }
                

        }
    }
}
