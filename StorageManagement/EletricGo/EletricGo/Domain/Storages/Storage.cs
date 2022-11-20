using EletricGo.Domain.Shared;

namespace EletricGo.Domain.Storages
{
    public class Storage : Entity<StorageId>, IAggregateRoot
    {
        public string Designation { get; set; }
        public Location? Location { get;  set; }

        public List<ChargingSystem>? ChargingSystems { get; set; }
        public bool Active { get; private set; }

        public Storage(string designation, Location loc, List<ChargingSystem> chargingSystems)
        {
            this.Id = new StorageId(Guid.NewGuid());
            this.Designation = designation;
            this.Active = true;
            Location = new Location(loc.Latitude, loc.Longitude, loc.Altitude, loc.Address);
            ChargingSystems = new List<ChargingSystem>();
            for(int i = 0; i < chargingSystems.Count; i++)
            {
                var chargingSystem = new ChargingSystem(chargingSystems[i].ChargingTime);
                ChargingSystems.Add(chargingSystem);
            }
        }
        public Storage() { }

        public Storage(string designation) {
            this.Id = new StorageId(Guid.NewGuid());
            this.Designation = designation;
        }

        public Storage(string designation, Location loc) {
            this.Id = new StorageId(Guid.NewGuid());
            this.Designation = designation;
            Location = new Location(loc.Latitude, loc.Longitude, loc.Altitude, loc.Address);
        }

        public void changeDesignation(string designation)
        {
            this.Designation = designation;
        }

        public void changeLocation(Location location)
        {
            Location.changeLatitude(location.Latitude);
            Location.changeLongitude(location.Longitude);
            Location.changeAltitude(location.Altitude);
            Location.changeAddress(location.Address);
        }

    }
}
