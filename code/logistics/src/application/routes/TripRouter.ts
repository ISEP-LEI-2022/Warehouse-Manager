import express, { Request, Response } from "express";
import container from "typedi";
import config from "../../config";
import { Err } from "../../domain/utils/Err";
import { ITripController } from "../controllers/trip/ITripController";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const createTripInstance = <ITripController>(
      container.get(config.controllers.TripController.name)
    );

    const persisted = await createTripInstance.createTrip(req.body);

    res.status(200).json(persisted);
  } catch (err) {
    if (err instanceof Err) {
      res.status(err.code).send(err.object());
    } else {
      res.status(500).send("Unexpected Error" + err);
    }
  }
});

router.get("/:idTrip?", async (req: Request, res: Response) => {
  try {
    const getTripInstance = <ITripController>(
      container.get(config.controllers.TripController.name)
    );

    if (req.params.idTrip !== undefined) {
      const trip = await getTripInstance.getTripById(
        req.params.idTrip as string
      );
      res.status(200).json(trip);
    } else {
      const listTrips = await getTripInstance.getTrips();
      res.status(200).json(listTrips);
    }
  } catch (err) {
    if (err instanceof Err) {
      res.status(err.code).send(err.object());
    } else {
      res.status(500).send("Unexpected Error" + err);
    }
  }
});

router.get("/:registration/:date", async (req: Request, res: Response) => {
  try {
    const getTripInstance = <ITripController>(
      container.get(config.controllers.TripController.name)
    );

      const trip = await getTripInstance.getTripByRegDate(
        req.params.registration as string,
        new Date(req.params.date)
      );
      res.status(200).json([trip]);
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
    const updateTripInstance = <ITripController>(
      container.get(config.controllers.TripController.name)
    );
    const updated = await updateTripInstance.updateTripById(req.body);
    res.status(200).json(updated);
  } catch (err) {
    if (err instanceof Err) {
      res.status(err.code).send(err.object());
    } else {
      res.status(500).send("Unexpected Error" + err);
    }
  }
});

export default router;
