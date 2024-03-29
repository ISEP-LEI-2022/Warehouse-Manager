﻿
using System.ComponentModel.Design;

namespace EletricGo.Domain.Storages
{
    public class StorageDto
    {
        public Guid Id { get; set; }
        public string Designation { get; set; }
        public Location Location { get; set; }

        public List<ChargingSystem>? ChargingSystems { get; set; }

        public bool Active { get; private set; }

        public StorageDto(Guid id, string designation, Location location, List<ChargingSystem>? chargingSystems, bool active)
        {
            this.Id = id;
            this.Designation = designation;
            this.Location = location;
            this.ChargingSystems = chargingSystems;
            this.Active = active;
        }
    }
}
