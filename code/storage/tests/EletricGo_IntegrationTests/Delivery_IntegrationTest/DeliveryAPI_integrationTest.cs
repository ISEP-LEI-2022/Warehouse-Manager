using EletricGo.Domain.Deliveries;
using EletricGo.Domain.Storages;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace EletricGo_IntegrationTests.Delivery_IntegrationTest {
    public class DeliveryAPI_integrationTest {
        [Fact]
        public async Task GetDeliveryITest() {

            var client = new TestClientProvider().Client;
            var response = await client.GetAsync("/api/Deliveries");

            response.EnsureSuccessStatusCode();

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task CreateDeliveryITest() {

            var designation = "Integration Test V1";
            List<ChargingSystem> chargingSystems = new List<ChargingSystem>();
            chargingSystems.Add(new ChargingSystem("40"));
            Location location = new Location("15", "15", "15", new Address("rua 6", "7", "5", "4455-856", new City(123, "Lisboa")));
            List<Product> productsList = new List<Product>();
            productsList.Add(new Product("P1 Integration Test", 2, 2));

            var client = new TestClientProvider().Client;

            var response = await client.PostAsync("/api/Deliveries"
               , new StringContent(
               JsonConvert.SerializeObject(new CreatingDeliveryDto() {
                   DeliveryDate = new DateTime(2022,05,02),
                   DeliveryWeight = 5.5,
                   FinalStorageId = "54fb23bb-e8c3-44f7-8d15-dacb23285473",
                   TimeToLoad = 5,
                   TimeToUnload = 5,
                   Products = productsList,
               }),
           Encoding.UTF8,
           "application/json"));

            response.EnsureSuccessStatusCode();

            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        }
}
}
