import express from "express";
import TruckRouter from "./TruckRouter";
import RouteRouter from "./RouteRouter";
import TripRouter from "./TripRouter";

const router = express.Router();

router.use("/routes", RouteRouter)
router.use("/trucks", TruckRouter)
router.use("/trips", TripRouter)

export default router;
