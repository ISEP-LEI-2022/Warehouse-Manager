import { Application } from "express";
import mongoose from "mongoose";
import config from "../config";
import { RouteMongoose } from "../infrastructure/schemas/RouteSchema";
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
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };
  await mongoose.connect(mongoDB_HOST,options);

  console.log("MongoDB connected");

  /*
   * Schemas
   */
  const RouteSchema = {
    name: "RouteSchema",
    model: RouteMongoose,
  };

  /*
   * Controllers
   */
  const RouteController = {
    name: config.controllers.RouteController.name,
    path: config.controllers.RouteController.path,
  };

  /*
   * Services
   */
  const RouteService = {
    name: config.services.RouteService.name,
    path: config.services.RouteService.path,
  };

  /*
   * Repositories
   */
  const RouteRepository = {
    name: config.repositories.RouteRepository.name,
    path: config.repositories.RouteRepository.path,
  };

  dependencyInjector({
    models: [RouteSchema],
    controllers: [RouteController],
    services: [RouteService],
    repositories: [RouteRepository],
  });

  expressLoader(expressApp);
  console.log("Config worked");

}

export default appLoader;
