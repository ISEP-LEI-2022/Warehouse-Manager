using EletricGo.Controllers;
using EletricGo.Domain.Shared;
using EletricGo.Domain.Storages;
using Microsoft.AspNetCore.Mvc;
using Moq;


namespace EletricGo_UnitTests.Storage_UnitTests
{
    public class StorageAPI_UnitTests
    {
        [Fact]
        public void CreateStorageTest()
        {
            // cria uma nova


            List<ChargingSystem> chargingSystems = new List<ChargingSystem>();
            chargingSystems.Add(new ChargingSystem("40"));
            Location location = new Location("15", "15", "15", new Address("rua 6", "7", "5", "4455-856", new City(123, "Lisboa")));
            Storage newStorage = new Storage("Unit Test", location, chargingSystems);

            Moq.Mock<IStorageRepository> mockedUserRepo = new Moq.Mock<IStorageRepository>();

            Moq.Mock<IUnitOfWork> mockedUnitOfWork = new Moq.Mock<IUnitOfWork>();
            mockedUserRepo.Setup(x => x.AddAsync(It.IsAny<Storage>())).ReturnsAsync(newStorage);

            //mockedUnitOfWork.Setup(x => x.CommitAsync()).ReturnsAsync(null);

            CreatingStorageDto creatingStorageDto = new CreatingStorageDto("Unit Test", location, chargingSystems);
            // Act guarda na bd
            StorageService storageService = new StorageService(mockedUnitOfWork.Object, mockedUserRepo.Object);
            Task<StorageDto> storageDto = storageService.AddAsync(creatingStorageDto);

            // Assert
            Assert.True(storageDto.Result.Designation.Equals(creatingStorageDto.Designation));



            //Location
            Assert.True(storageDto.Result.Location.Longitude.Equals(creatingStorageDto.Location.Longitude));
            Assert.True(storageDto.Result.Location.Altitude.Equals(creatingStorageDto.Location.Altitude));
            Assert.True(storageDto.Result.Location.Latitude.Equals(creatingStorageDto.Location.Latitude));



            //Adress
            Assert.True(storageDto.Result.Location.Address.Street.Equals(creatingStorageDto.Location.Address.Street));
            Assert.True(storageDto.Result.Location.Address.Floor.Equals(creatingStorageDto.Location.Address.Floor));
            Assert.True(storageDto.Result.Location.Address.PostalCode.Equals(creatingStorageDto.Location.Address.PostalCode));
            Assert.True(storageDto.Result.Location.Address.Door.Equals(creatingStorageDto.Location.Address.Door));



            //City
            Assert.True(storageDto.Result.Location.Address.City.Name.Equals(creatingStorageDto.Location.Address.City.Name));
            Assert.True(storageDto.Result.Location.Address.City.Number.Equals(creatingStorageDto.Location.Address.City.Number));



            // Charging Systems
            for (int i = 0; i < storageDto.Result.ChargingSystems.Count; i++)
            {
                for (int j = 0; j < creatingStorageDto.ChargingSystems.Count; j++)
                {
                    Assert.True(creatingStorageDto.ChargingSystems[j].ChargingTime.Equals(storageDto.Result.ChargingSystems[i].ChargingTime));
                }
            }

        }


        [Fact]
        public async Task GetByIdStorageTest()
        {
            // Arrange
            string storageId = "54fb23bb-e8c3-44f7-8d15-dacb23285473";
            List<ChargingSystem> chargingSystems = new List<ChargingSystem>();
            chargingSystems.Add(new ChargingSystem("40"));
            Location location = new Location("15", "15", "15", new Address("rua 6", "7", "5", "4455-856", new City(123, "Lisboa")));
            Storage storageDto = new Storage("Armazem Porto 1", location, chargingSystems);
            var mockRepo = new Mock<IStorageRepository>();
            Moq.Mock<IUnitOfWork> mockedUnitOfWork = new Moq.Mock<IUnitOfWork>();
            mockRepo.Setup(repo => repo.GetByIdAsync(new StorageId(storageId)))
                .ReturnsAsync(storageDto);
            StorageService service = new StorageService(mockedUnitOfWork.Object, mockRepo.Object);
            var controller = new StoragesController(service);

            // Act
            var result = await controller.GetGetById(new StorageId(storageId).AsGuid());

            // Assert
            var actionResult = Assert.IsType<ActionResult<StorageDto>>(result);
            var returnValue = Assert.IsType<StorageDto>(actionResult.Value);
            var storage = returnValue;
            Assert.Equal(storageDto.Designation, storage.Designation);

            //Location
            Assert.True(storageDto.Location.Longitude.Equals(storage.Location.Longitude));
            Assert.True(storageDto.Location.Altitude.Equals(storage.Location.Altitude));
            Assert.True(storageDto.Location.Latitude.Equals(storage.Location.Latitude));



            //Adress
            Assert.True(storageDto.Location.Address.Street.Equals(storage.Location.Address.Street));
            Assert.True(storageDto.Location.Address.Floor.Equals(storage.Location.Address.Floor));
            Assert.True(storageDto.Location.Address.PostalCode.Equals(storage.Location.Address.PostalCode));
            Assert.True(storageDto.Location.Address.Door.Equals(storage.Location.Address.Door));



            //City
            Assert.True(storageDto.Location.Address.City.Name.Equals(storage.Location.Address.City.Name));
            Assert.True(storageDto.Location.Address.City.Number.Equals(storage.Location.Address.City.Number));



            // Charging Systems
            for (int i = 0; i < storageDto.ChargingSystems.Count; i++)
            {
                for (int j = 0; j < storage.ChargingSystems.Count; j++)
                {
                    Assert.True(storage.ChargingSystems[j].ChargingTime.Equals(storageDto.ChargingSystems[i].ChargingTime));
                }
            }
        }



    }
}
