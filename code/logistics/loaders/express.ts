import express from "express";
import routeRoute from "../application/routes/routeRouter";
import cors from "cors";

function expressLoader(app: express.Application) {
  app.get("/", (req, res) => {
    res.send("I'm alive!");
  });

  app.use(
    cors({
      methods: ["GET", "POST"],
      credentials: true,
    })
  );

  app.use("/route", routeRoute);

}

export = expressLoader;
