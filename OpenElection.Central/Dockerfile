FROM mcr.microsoft.com/dotnet/runtime:10.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 9110

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["OpenElection.Central/OpenElection.Central.csproj", "OpenElection.Central/"]
COPY ["OpenElection.Central.Infrastructure/OpenElection.Central.Infrastructure.csproj", "OpenElection.Central.Infrastructure/"]
COPY ["OpenElection.Central.Domain/OpenElection.Central.Domain.csproj", "OpenElection.Central.Domain/"]
COPY ["OpenElection.Microservice/OpenElection.Microservice.csproj", "OpenElection.Microservice/"]
RUN dotnet restore "OpenElection.Central/OpenElection.Central.csproj"
COPY . .
WORKDIR "/src/OpenElection.Central"
RUN dotnet build "./OpenElection.Central.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./OpenElection.Central.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "OpenElection.Central.dll"]
