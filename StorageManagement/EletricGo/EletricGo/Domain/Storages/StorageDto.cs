namespace EletricGo.Domain.Storages
{
    public class StorageDto
    {
        public Guid Id { get; set; }
        public string Designation { get; set; }
        public Location Location { get; set; }

        public StorageDto(Guid id, string designation, Location location)
        {
            Id = id;
            Designation = designation;
            Location = location;
        }
    }
}
