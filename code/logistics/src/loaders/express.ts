import express from "express";
import Routes from "../application/routes";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

function expressLoader(app: express.Application) {
  app.get("/", (req, res) => {
    res.send("Welcome to the Logistics API!");
  });

  app.use(
    cors({
      methods: ["GET", "POST"],
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(morgan("tiny"));
  app.use(express.static("public"));
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "/swagger.json",
      },
    })
  );

  app.use(Routes);

}

export default expressLoader;