FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081
EXPOSE 9113

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["OpenElection.Booth/OpenElection.Booth.csproj", "OpenElection.Booth/"]
COPY ["OpenElection.Microservice/OpenElection.Microservice.csproj", "OpenElection.Microservice/"]
RUN dotnet restore "OpenElection.Booth/OpenElection.Booth.csproj"
COPY . .
WORKDIR "/src/OpenElection.Booth"
RUN dotnet build "./OpenElection.Booth.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM node AS nodebuild
WORKDIR /src/openelection.booth.web
COPY openelection.booth.web/package.json .
RUN npm install
COPY openelection.booth.web/ .
RUN npm run build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./OpenElection.Booth.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=nodebuild /src/openelection.booth.web/dist/openelection.booth.web/browser/* /app/wwwroot/
ENTRYPOINT ["dotnet", "OpenElection.Booth.dll"]
