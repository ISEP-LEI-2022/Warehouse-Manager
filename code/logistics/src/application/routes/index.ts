import express from "express";
import TruckRouter from "./TruckRouter";
import RouteRouter from "./RouteRouter";

const router = express.Router();

router.use("/routes", RouteRouter)
router.use("/trucks", TruckRouter)

export default router;
