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
    } else {
      res.status(500).send("Unexpected Error" + err);
    }
  }
});

router.get("/:registration?", async (req: Request, res: Response) => {
  try {
    const getTruckInstance = <ITruckController>(
      container.get(config.controllers.TruckController.name)
    );

    if (req.params.registration !== undefined) {
      const truck = await getTruckInstance.getTruckByRegistration(
        req.params.registration as string
      );
      res.status(200).json(truck);
    } else {
      const listTrucks = await getTruckInstance.getTrucks();
      res.status(200).json(listTrucks);
    }
  } catch (err) {
    if (err instanceof Err) {
      res.status(err.code).send(err.object());
    } else {
      res.status(500).send("Unexpected Error" + err);
    }
  }
});

router.put("/", async (req: Request, res: Response) => {
  try {
    const updateTruckInstance = <ITruckController>(
      container.get(config.controllers.TruckController.name)
    );
    const updated = await updateTruckInstance.updateTruckByRegistration(
      req.body
    );
    res.status(200).json(updated);
  } catch (err) {
    if (err instanceof Err) {
      res.status(err.code).send(err.object());
    } else {
      res.status(500).send("Unexpected Error" + err);
    }
  }
});

router.patch("/status/:registration", async (req: Request, res: Response) => {
  try {
    const updateTruckInstance = <ITruckController>(
      container.get(config.controllers.TruckController.name)
    );
    const updated = await updateTruckInstance.changeActiveStatus(
      req.params.registration as string
    );
    res.status(200).json(updated);
  } catch (err) {
    if (err instanceof Err) {
      res.status(err.code).send(err.object());
    } else {
      res.status(500).send("Unexpected Error" + err);
    }
  }
});

router.get("/pag/ination", async (req: Request, res: Response) => {
  try {
    const getTruckInstance = <ITruckController>(
      container.get(config.controllers.TruckController.name)
    );

    const listTrucks = await getTruckInstance.getTrucksByPagination(
      Number(req.query.page),
      Number(req.query.pageRecords)
    );

    res.status(200).json(listTrucks);
  } catch (err) {
    if (err instanceof Err) {
      res.status(err.code).send(err.object());
    } else {
      res.status(500).send("Unexpected Error" + err);
    }
  }
});

export default router;
