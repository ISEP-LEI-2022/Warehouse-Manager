import express, { Request, Response } from "express";
import container from "typedi";
import config from "../../config";
import { Err } from "../../domain/utils/Err";
import { ITruckController } from "../controllers/truck/ITruckController";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const createTruckInstance = <ITruckController>(
        container.get(config.controllers.TruckController.name)
        );

        const persisted = await createTruckInstance.createTruck(req.body);

        res.status(200).json(persisted);
    } catch (err) {
        if (err instanceof Err) {
        res.status(err.code).send(err.object());
        }else{
            res.status(500).send("Unexpected Error" + err);
        }
    }
    });

    router.get("/", async (req: Request, res: Response) => {
        try {
        const getTruckInstance = <ITruckController>(
            container.get(config.controllers.TruckController.name)
        );
        if (Object.keys(req.query).length === 0) {
            const listRoutes = await getTruckInstance.getTrucks();
            res.status(200).json(listRoutes);
        } else {
            const route = await getTruckInstance.getTruckByRegistration(
            req.query.registration as string
            );
            res.status(200).json(route);
        }
        } catch (err) {
        if (err instanceof Err) {
            res.status(err.code).send(err.object());
        } else {
            res.status(500).send("Unexpected Error" + err);
        }
        }
    });

export default router;