using System;
using Moq;
using EletricGo.Domain.Storages;
using EletricGo.Migrations;
using EletricGo.Domain.Deliveries;
using EletricGo.Domain.Shared;

namespace ARQSI_1_Unit_Tests.RelationUnitTests.cs
{
    public class DeliveryAPI_UnitTests
    {
        [Fact]
        public void CreateDelivery()
        {
            //User newUserA = new User(EmotionalStateString.HAPPY, "hcarrulo", "passTest", "hugo", "email@gmail.com", new DateTime(2000, 09, 04), "910632344", "www.lala.pt");
            //User newUserB = new User(EmotionalStateString.HAPPY, "anaC", "passTest", "ana", "email@gmail.com", new DateTime(2000, 09, 04), "910632344", "www.lala.pt");
            List<ChargingSystem> chargingSystems = new List<ChargingSystem>();
            chargingSystems.Add(new ChargingSystem("40"));
            Storage newStorage = new Storage("Armazem Teste", new Location("15", "15", "15", new Address("Rua Teste", "1", "1", "4000-000", new City(1, "Teste"))), chargingSystems);
            List<Product> productsList =   new List<Product>();
            productsList.Add(new Product("P1", 2, 2));
            Delivery newDelivery = new Delivery(new DateTime(2022,11,1),12.5,newStorage,12.5,12.5,productsList);

            Moq.Mock<IDeliveryRepository> mockedDeliveryRepo = new Moq.Mock<IDeliveryRepository>();
            mockedDeliveryRepo.Setup(x => x.AddAsync(It.IsAny<Delivery>())).ReturnsAsync(newDelivery);
            Moq.Mock<IUnitOfWork> mockedUnitOfWork = new Moq.Mock<IUnitOfWork>();
            mockedUnitOfWork.Setup(x => x.CommitAsync()).ReturnsAsync(null);


            CreatingDeliveryDto setDeliveryDTO = new CreatingDeliveryDto(new DateTime(2022, 11, 1), 12.5, newStorage, 12.5, 12.5, productsList);

            DeliveryService deliveryService = new DeliveryService(mockedUnitOfWork.Object,mockedDeliveryRepo.Object);
            Task<DeliveryDto> getDeliveryDTO = deliveryService.AddAsync(setDeliveryDTO);

            Assert.True(getDeliveryDTO.Result.DeliveryDate.Equals(setDeliveryDTO.DeliveryDate));
            Assert.True(getDeliveryDTO.Result.DeliveryWeight.Equals(setDeliveryDTO.DeliveryWeight));
        }

      
    } 
}
