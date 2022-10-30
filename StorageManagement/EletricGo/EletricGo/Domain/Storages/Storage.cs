using EletricGo.Domain.Shared;

namespace EletricGo.Domain.Storages
{
    public class Storage : Entity<StorageId>, IAggregateRoot
    {
        public string Designation { get; set; }
        public Location Location { get;  set; }
        public bool Active { get; private set; }

        public Storage(string designation, Location loc)
        {
            this.Id = new StorageId(Guid.NewGuid());
            this.Designation = designation;
            this.Active = true;
            Location = new Location(loc.Latitude, loc.Longitude, loc.Altitude, loc.Address);
        }
        public Storage() { }

        public void changeDesignation(string designation)
        {
            this.Designation = designation;
        }

    }
}
