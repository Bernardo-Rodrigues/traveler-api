import { Router } from "express";
import * as controller from "../controllers/travelsController.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const travelsRouter = Router();

travelsRouter.get(
  "/travels",
  validateTokenMiddleware,
  controller.listUpcomingTrips
);

export default travelsRouter;
