using System;
using Moq;
using EletricGo.Domain.Storages;
using EletricGo.Migrations;
using EletricGo.Domain.Deliveries;
using EletricGo.Domain.Shared;
using EletricGo.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace ARQSI_1_Unit_Tests.RelationUnitTests.cs
{
    public class DeliveryAPI_UnitTests
    {
        [Fact]
        public void CreateDelivery()
        {
            StorageId storageId = new StorageId("bd1f0ba2-cb2d-4bc5-af4f-fe920697dffb");
            List<Product> productsList = new List<Product>();
            productsList.Add(new Product("P1 Unit Test", 2, 2));
            Delivery newDelivery = new Delivery(new DateTime(2022, 11, 1), 12.5, storageId, 10, 10, productsList);

            Moq.Mock<IDeliveryRepository> mockedDeliveryRepo = new Moq.Mock<IDeliveryRepository>();

            Moq.Mock<IUnitOfWork> mockedUnitOfWork = new Moq.Mock<IUnitOfWork>();
            mockedDeliveryRepo.Setup(x => x.AddAsync(It.IsAny<Delivery>())).ReturnsAsync(newDelivery);

            //mockedUnitOfWork.Setup(x => x.CommitAsync()).ReturnsAsync(null);

            CreatingDeliveryDto creatingDeliveryDto = new CreatingDeliveryDto(new DateTime(2022, 11, 1), 12.5, "bd1f0ba2-cb2d-4bc5-af4f-fe920697dffb", 10, 10, productsList);
            // Act guarda na bd
            DeliveryService deliveryService = new DeliveryService(mockedUnitOfWork.Object, mockedDeliveryRepo.Object);
            Task<DeliveryDto> deliveryDto = deliveryService.AddAsync(creatingDeliveryDto);

            Assert.True(deliveryDto.Result.DeliveryDate.Equals(creatingDeliveryDto.DeliveryDate));
            Assert.True(deliveryDto.Result.DeliveryWeight.Equals(creatingDeliveryDto.DeliveryWeight));
            Assert.True(deliveryDto.Result.FinalStorageId.Equals(new StorageId(creatingDeliveryDto.FinalStorageId).AsGuid()));
            Assert.True(deliveryDto.Result.TimeToLoad.Equals(creatingDeliveryDto.TimeToLoad));
            Assert.True(deliveryDto.Result.TimeToUnload.Equals(creatingDeliveryDto.TimeToUnload));
            for (int i = 0; i < deliveryDto.Result.Products.Count; i++)
            {
                for (int j = 0; j < creatingDeliveryDto.Products.Count; j++)
                {
                    Assert.True(creatingDeliveryDto.Products[j].Name.Equals(deliveryDto.Result.Products[i].Name));
                    Assert.True(creatingDeliveryDto.Products[j].LevelOfPolution.Equals(deliveryDto.Result.Products[i].LevelOfPolution));

                }
            }
        }

        [Fact]
        public async Task GetByIdDeliveryTest()
        {
            // Arrange
            string testSessionId = "0e44a3fb-5bcf-4f13-8f0f-bb672e7deceb";
            List<Product> products = new List<Product>();
            products.Add(new Product("Ana",5,5));
            products.Add(new Product("Nuno", 6, 1));
            StorageId storageId = new StorageId("bd1f0ba2-cb2d-4bc5-af4f-fe920697dffb");
            Delivery delivery = new Delivery(new DateTime(2022, 11, 30), 6, storageId, 10, 11, products);
            var mockRepo = new Mock<IDeliveryRepository>();
            Moq.Mock<IUnitOfWork> mockedUnitOfWork = new Moq.Mock<IUnitOfWork>();
            mockRepo.Setup(repo => repo.GetByIdAsync(new DeliveryId(testSessionId)))
                .ReturnsAsync(delivery);
            DeliveryService service = new DeliveryService(mockedUnitOfWork.Object, mockRepo.Object);
            var controller = new DeliveriesController(service);

            // Act
            var result = await controller.GetGetById(new DeliveryId(testSessionId).AsGuid());

            // Assert
            var actionResult = Assert.IsType<ActionResult<DeliveryDto>>(result);
            var returnValue = Assert.IsType<DeliveryDto>(actionResult.Value);
            var getDelivery = returnValue;
            Assert.True(delivery.DeliveryDate.Equals(getDelivery.DeliveryDate));
            Assert.True(delivery.DeliveryWeight.Equals(getDelivery.DeliveryWeight));
            Assert.True(delivery.FinalStorageId.AsGuid().Equals(new StorageId(getDelivery.FinalStorageId).AsGuid()));
            Assert.True(delivery.TimeToLoad.Equals(getDelivery.TimeToLoad));
            Assert.True(delivery.TimeToUnload.Equals(getDelivery.TimeToUnload));

            //for (int i = 0; i < getDelivery.Products.Count; i++)
            //{
            //    for (int j = 0; j < delivery.Products.Count; j++)
            //    {
            //        Assert.True(delivery.Products[j].Name.Equals(getDelivery.Products[i].Name));
            //        Assert.True(delivery.Products[j].LevelOfPolution.Equals(getDelivery.Products[i].LevelOfPolution));

            //    }
            //}
        }

    } 
}
