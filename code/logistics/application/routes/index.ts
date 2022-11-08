import express from "express";
import PingController from "../controllers/ping.controller";
import TruckRouter from "./truck.router";

const router = express.Router();

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.use("/trucks", TruckRouter)

export default router;
