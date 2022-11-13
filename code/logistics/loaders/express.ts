import express from "express";
import RouteRoute from "../application/routes/RouteRouter";
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

  app.use("/route", RouteRoute);

}

export default expressLoader;