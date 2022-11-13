import express, { Application, Request, Response } from "express";
import "reflect-metadata";

import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import Router from "./application/routes";
import appLoader from "./loaders";
const PORT = process.env.PORT || 3000;

const app: Application = express();

async function startApp() {
  const app = express();
  await appLoader({
    expressApp: app as express.Application,
    mongoDB_HOST: "mongodb://mongodb:27017/logistics",
  });

  app.listen(3000, () => {
    console.log(`Listening at http://localhost:3000`);
  });

}

startApp();
// app.use(express.json());
// app.use(morgan("tiny"));
// app.use(express.static("public"));
// app.use(
//   "/docs",
//   swaggerUi.serve,
//   swaggerUi.setup(undefined, {
//     swaggerOptions: {
//       url: "/swagger.json",
//     },
//   })
// );
// app.use(Router);

// app.listen(PORT, () => {
//   console.log("Server is running on port", PORT);
// });
