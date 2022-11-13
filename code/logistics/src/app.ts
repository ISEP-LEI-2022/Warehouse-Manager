import express, { Application } from "express";
import { env } from 'node:process';
import appLoader from "./loaders";
import "reflect-metadata";

async function startApp() {
  const PORT = process.env.PORT || 3000;
  const app: Application = express();

  let url = 'mongodb://localhost:27017/logistics'
  if(env.database) url = env.database

  await appLoader({
    expressApp: app as express.Application,
    mongoDB_HOST: url,
  });

  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });

}

startApp();