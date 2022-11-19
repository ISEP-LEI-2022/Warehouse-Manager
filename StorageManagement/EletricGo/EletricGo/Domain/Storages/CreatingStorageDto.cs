namespace EletricGo.Domain.Storages
{
    public class CreatingStorageDto
    {
        public string Designation { get; set; }
        public Location Location { get; set; }
        public List<ChargingSystem> ChargingSystems { get; set; }

        public CreatingStorageDto(string designation, Location location, List<ChargingSystem> chargingSystems)
        {
            Designation = designation;
            Location = location;
            ChargingSystems = chargingSystems;
        }
    }
}
