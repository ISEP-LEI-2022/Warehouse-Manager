#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app
COPY ./src ./
WORKDIR /app/EletricGo
RUN dotnet restore "EletricGo.csproj"
RUN dotnet build "EletricGo.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "EletricGo.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM build AS unit_tests
WORKDIR /app
COPY ./tests/EletricGo_UnitTests ./EletricGo_UnitTests
WORKDIR /app/EletricGo_UnitTests
CMD ["dotnet", "test"]

FROM build AS integration_tests
WORKDIR /app
COPY ./tests/EletricGo_IntegrationTests ./EletricGo_IntegrationTests
WORKDIR /app/EletricGo_IntegrationTests
CMD ["dotnet", "test"]

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "EletricGo.dll"]
