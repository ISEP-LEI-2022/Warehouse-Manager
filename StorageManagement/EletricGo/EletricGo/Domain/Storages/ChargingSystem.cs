using EletricGo.Domain.Shared;

namespace EletricGo.Domain.Storages
{
    public class ChargingSystem : Entity<ChargingSystemId>
    {
        public string ChargingTime { get; set; }



        public ChargingSystem() {
        }

        public ChargingSystem(string chargingTime)
        {
            Id = new ChargingSystemId(Guid.NewGuid());
            ChargingTime = chargingTime;
        }
    }
}
