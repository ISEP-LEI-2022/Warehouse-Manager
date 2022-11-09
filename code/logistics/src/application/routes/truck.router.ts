import express from "express";
import TruckController from '../controllers/truck.controller';

const router = express.Router();

router.get("/", async (_req, res) => {
    const controller = new TruckController();
    const response = await controller.getTrucks();
    return res.send(response);
});

router.post("/", async (req, res) => {
    const controller = new TruckController();
    const response = await controller.createTruck(req.body);
    return res.send(response);
});

router.get("/:id", async (req, res) => {
    const controller = new TruckController();
    const response = await controller.getTruck(req.params.id);
    if (!response) res.status(404).send({message: "No truck found"})
    return res.send(response);
});

export default router;