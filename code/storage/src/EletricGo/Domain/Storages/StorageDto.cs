﻿
namespace EletricGo.Domain.Storages
{
    public class StorageDto
    {
        public Guid Id { get; set; }
        public string Designation { get; set; }
        public Location Location { get; set; }

        public List<ChargingSystem> ChargingSystems { get; set; }

        public StorageDto(Guid id, string designation, Location location, List<ChargingSystem> chargingSystems)
        {
            this.Id = id;
            this.Designation = designation;
            this.Location = location;
            this.ChargingSystems = chargingSystems;
        }
    }
}
