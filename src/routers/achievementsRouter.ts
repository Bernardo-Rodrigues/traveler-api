import { Router } from "express";
import * as controller from "../controllers/achievementsController.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const achievementsRouter = Router();

achievementsRouter.get(
  "/achievements/destinies/:id",
  validateTokenMiddleware,
  controller.get
);
achievementsRouter.get(
  "/achievements",
  validateTokenMiddleware,
  controller.listByUser
);

export default achievementsRouter;
