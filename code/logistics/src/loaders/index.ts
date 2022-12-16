import { Application } from "express";
import mongoose from "mongoose";
import { TripMongoose } from "../infrastructure/schemas/TripSchema";
import config from "../config";
import { RouteMongoose } from "../infrastructure/schemas/RouteSchema";
import { TruckMongoose } from "../infrastructure/schemas/TruckSchema";
import dependencyInjector from "./dependencyInjector";
import expressLoader from "./express";

async function appLoader({
  expressApp,
  mongoDB_HOST,
}: {
  expressApp: Application;
  mongoDB_HOST: string;
}): Promise<void> {
  const options = {
    autoIndex: true, // Build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  };

  await mongoose.connect(mongoDB_HOST, options).then(
    () => {
      console.log(`Connected to database! - ${mongoDB_HOST}`);
    },
    (err) => {
      console.log("Unable to connect to the database. Exiting..");
      process.exit();
    }
  );

  /*
   * Schemas
   */
  const RouteSchema = {
    name: "RouteSchema",
    model: RouteMongoose,
  };
  const TruckSchema = {
    name: "TruckSchema",
    model: TruckMongoose,
  };
  const TripSchema = {
    name: "TripSchema",
    model: TripMongoose,
  };

  /*
   * Controllers
   */
  const RouteController = {
    name: config.controllers.RouteController.name,
    path: config.controllers.RouteController.path,
  };
  const TruckController = {
    name: config.controllers.TruckController.name,
    path: config.controllers.TruckController.path,
  };
  const TripController = {
    name: config.controllers.TripController.name,
    path: config.controllers.TripController.path,
  };

  /*
   * Services
   */
  const RouteService = {
    name: config.services.RouteService.name,
    path: config.services.RouteService.path,
  };
  const TruckService = {
    name: config.services.TruckService.name,
    path: config.services.TruckService.path,
  };
  const TripService = {
    name: config.services.TripService.name,
    path: config.services.TripService.path,
  };

  /*
   * Repositories
   */
  const RouteRepository = {
    name: config.repositories.RouteRepository.name,
    path: config.repositories.RouteRepository.path,
  };
  const TruckRepository = {
    name: config.repositories.TruckRepository.name,
    path: config.repositories.TruckRepository.path,
  };
  const TripRepository = {
    name: config.repositories.TripRepository.name,
    path: config.repositories.TripRepository.path,
  };

  dependencyInjector({
    models: [RouteSchema, TruckSchema, TripSchema],
    controllers: [RouteController, TruckController, TripController],
    services: [RouteService, TruckService, TripService],
    repositories: [RouteRepository, TruckRepository, TripRepository],
  });

  expressLoader(expressApp);
  console.log("Configurations loaded successfully.");
}

export default appLoader;
