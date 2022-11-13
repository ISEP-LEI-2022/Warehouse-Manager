import express from "express";
import RouteRoute from "../application/routes/RouteRouter";
import TruckRoute from "../application/routes/TruckRouter";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

function expressLoader(app: express.Application) {
  app.get("/", (req, res) => {
    res.send("working!");
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

  app.use("/route", RouteRoute);
  app.use("/trucks", TruckRoute);

}

export default expressLoader;