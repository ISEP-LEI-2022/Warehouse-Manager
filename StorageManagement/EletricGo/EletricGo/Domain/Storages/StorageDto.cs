using EletricGo.Migrations;

namespace EletricGo.Domain.Storages
{
    public class StorageDto
    {
        public Guid Id { get; set; }
        public string Designation { get; set; }
        public Location? Location { get; set; }

        public List<ChargingSystem>? ChargingSystems { get; set; }

        public StorageDto(Guid id, string designation, Location location, List<ChargingSystem> chargingSystems)
        {
            Id = id;
            Designation = designation;
            Location = location;
            ChargingSystems = chargingSystems;
        }

        public StorageDto(Guid id, string designation) {
            Id = id;
            Designation = designation;
        }

        public StorageDto(Guid id, string designation, Location loc) {
            Id = id;
            Designation = designation;
            Location = loc;
        }

        public static implicit operator Task<object>(StorageDto v) {
            throw new NotImplementedException();
        }
    }
}
