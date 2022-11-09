import { Application } from "express";
import mongoose from "mongoose";
import config from "../config";
import { routeMongoose } from "../infrastructure/schemas/routeSchema";
import dependencyInjector from "./dependencyInjector";
import expressLoader from "./express";

async function appLoader({
  expressApp,
  mongoDB_HOST,
}: {
  expressApp: Application;
  mongoDB_HOST: string;
}): Promise<void> {
  await mongoose.connect(mongoDB_HOST);
  console.log("MongoDB connected");

  /*
   * Schemas
   */
  const routeSchema = {
    name: "routeSchema",
    model: routeMongoose,
  };

  /*
   * Controllers
   */
  const routeController = {
    name: config.controllers.routeController.name,
    path: config.controllers.routeController.path,
  };

  /*
   * Services
   */
  const routeService = {
    name: config.services.routeService.name,
    path: config.services.routeService.path,
  };

  /*
   * Repositories
   */
  const routeRepository = {
    name: config.repositories.routeRepository.name,
    path: config.repositories.routeRepository.path,
  };

  dependencyInjector({
    models: [routeSchema],
    controllers: [routeController],
    services: [routeService],
    repositories: [routeRepository],
  });

  expressLoader(expressApp);
  
}
