namespace EletricGo.Domain.Storages
{
    public class CreatingStorageDto
    {
        public string Designation { get; set; }
        public Location Location { get; set; }

        public CreatingStorageDto(string designation, Location location)
        {
            Designation = designation;
            Location = location;
        }
    }
}
