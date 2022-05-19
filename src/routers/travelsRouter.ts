import { Router } from "express";
import * as controller from "../controllers/travelsController.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const travelsRouter = Router();

travelsRouter.get(
  "/travels",
  validateTokenMiddleware,
  controller.listUpcomingTrips
);
travelsRouter.get(
  "/travels/:id/tips",
  validateTokenMiddleware,
  controller.listTipsByDestination
);

export default travelsRouter;
