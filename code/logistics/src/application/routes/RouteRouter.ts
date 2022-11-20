import express, { Request, Response } from "express";
import container from "typedi";
import config from "../../config";
import { Err } from "../../domain/utils/Err";
import { IRouteController } from "../controllers/route/IRouteController";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const createRouteInstance = <IRouteController>(
      container.get(config.controllers.RouteController.name)
    );

    const persisted = await createRouteInstance.createRoute(req.body);

    res.status(200).json(persisted);
  } catch (err) {
    if (err instanceof Err) {
      res.status(err.code).send(err.object());
    } else {
      res.status(500).send("Unexpected Error" + err);
    }
  }
});

router.get("/:idRoute?", async (req: Request, res: Response) => {
  try {
    const getRouteInstance = <IRouteController>(
      container.get(config.controllers.RouteController.name)
    );

    if (req.params.idRoute !== undefined) {
      const route = await getRouteInstance.getRouteById(
        req.params.idRoute as string
      );
      res.status(200).json(route);
    } else {
      const listRoutes = await getRouteInstance.getRoutes();
      res.status(200).json(listRoutes);
    }
  } catch (err) {
    if (err instanceof Err) {
      res.status(err.code).send(err.object());
    } else {
      res.status(500).send("Unexpected Error" + err);
    }
  }
});

router.patch("/:idRoute", async (req: Request, res: Response) => {
  try {
    const updateRouteInstance = <IRouteController>(
      container.get(config.controllers.RouteController.name)
    );
    const updated = await updateRouteInstance.updateRouteById(
      req.params.idRoute as string,
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

export default router;
