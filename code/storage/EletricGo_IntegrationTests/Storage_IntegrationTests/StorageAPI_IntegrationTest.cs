using EletricGo.Domain.Storages;
using EletricGo.Migrations;
using Newtonsoft.Json;
using System.Net;
using System.Text;

namespace EletricGo_IntegrationTests.Storage_IntegrationTests {
    public class StorageAPI_IntegrationTest {


        [Fact]
        public async Task GetStoragesITest() {

            var client = new TestClientProvider().Client;
            var response = await client.GetAsync("/api/Storages");

            response.EnsureSuccessStatusCode();

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task CreateStorageITest() {

            var designation = "Teste integração";
            List<ChargingSystem> chargingSystems = new List<ChargingSystem>();
            chargingSystems.Add(new ChargingSystem("40"));

            Location location = new Location("15", "15", "15", new Address("rua 6", "7", "5", "4455-856", new City(123, "Lisboa")));

            var client = new TestClientProvider().Client;
            
            var response = await client.PostAsync("/api/Storages", new StringContent(
               JsonConvert.SerializeObject(new CreatingStorageDto() {
                   Designation = designation,
                   Location = location,
                   ChargingSystems = chargingSystems
               }),
           Encoding.UTF8,
           "application/json"));

            response.EnsureSuccessStatusCode();

            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        }

    }
}
