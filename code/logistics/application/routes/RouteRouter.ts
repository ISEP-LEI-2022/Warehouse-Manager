import express, { Request, Response } from "express";
import container from "typedi";
import config from "../../config";
import { Err } from "../../domain/utils/Err";
import { IRouteController } from "../controllers/route/IRouteController";

const router = express.Router();

router.post("/create", async (req: Request, res: Response) => {
  try {
    const createRouteInstance = <IRouteController>(
      container.get(config.controllers.RouteController.name)
    );

    const persisted = await createRouteInstance.createRoute(req.body);
    res.status(200).json(persisted);
  } catch (err) {
    if (err instanceof Err) {
      res.status(err.code).send(err.object());
    }else{
        res.status(500).send("Unexpected Error");
    }
  }
});

export default router;