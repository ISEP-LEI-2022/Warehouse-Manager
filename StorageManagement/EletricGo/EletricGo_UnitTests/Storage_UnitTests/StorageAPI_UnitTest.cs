using EletricGo.Domain.Shared;
using EletricGo.Domain.Storages;
using Moq;


namespace EletricGo_UnitTests.Storage_UnitTests
{
    public class StorageAPI_UnitTests
    {
        [Fact]
        public void CreateStorageTest()
        {
            List<ChargingSystem> chargingSystems = new List<ChargingSystem>();
            chargingSystems.Add(new ChargingSystem("40"));
            Storage newStorage = new Storage("Armazem Teste", new Location("15", "15", "15", new Address("Rua Teste", "1", "1", "4000-000", new City(1, "Teste"))), chargingSystems);
            Moq.Mock<IStorageRepository> mockedStorageRepo = new Moq.Mock<IStorageRepository>();
            Moq.Mock<IUnitOfWork> mockedUnitOfWork = new Moq.Mock<IUnitOfWork>();
            mockedStorageRepo.Setup(r => r.AddAsync(It.IsAny<Storage>())).ReturnsAsync(newStorage);
            mockedUnitOfWork.Setup(x => x.CommitAsync()).ReturnsAsync(null);



            CreatingStorageDto creatingStorageDto = new CreatingStorageDto("Armazem Teste", new Location("15", "15", "15", new Address("Rua Teste", "1", "1", "4000-000", new City(1, "Teste"))), chargingSystems);
            // Act guarda na bd
            StorageService storageService = new StorageService(mockedUnitOfWork.Object, mockedStorageRepo.Object);
            Task<StorageDto> storageDto = storageService.AddAsync(creatingStorageDto);




            // Assert
            Assert.True(storageDto.Result.Designation.Equals(creatingStorageDto.Designation));
            Assert.True(storageDto.Result.Location.Equals(creatingStorageDto.Location));
            for (int i = 0; i < storageDto.Result.ChargingSystems.Count; i++)
            {
                for (int j = 0; j < creatingStorageDto.ChargingSystems.Count; j++)
                {
                    Assert.True(creatingStorageDto.ChargingSystems[j].ChargingTime.Equals(storageDto.Result.ChargingSystems[i].ChargingTime));
                }
            }

        }
    }
}
