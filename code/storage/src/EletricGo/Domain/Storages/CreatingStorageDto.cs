namespace EletricGo.Domain.Storages
{
    public class CreatingStorageDto
    {
        public string Designation { get; set; }
        public Location Location { get; set; }
        public List<ChargingSystem>? ChargingSystems { get; set; }

        public CreatingStorageDto() {
        }

        public CreatingStorageDto(string designation, Location location, List<ChargingSystem> chargingSystems)
        {
            this.Designation = designation;
            this.Location = location;
            this.ChargingSystems = chargingSystems;
        }

    }
}
