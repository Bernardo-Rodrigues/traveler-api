import { Router } from "express";
import * as controller from "../controllers/destinationsController.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const destinationsRouter = Router();

destinationsRouter.get(
  "/destinations",
  validateTokenMiddleware,
  controller.list
);
destinationsRouter.get(
  "/destinations/favorites",
  validateTokenMiddleware,
  controller.listByFavorites
);
destinationsRouter.get(
  "/destinations/top",
  validateTokenMiddleware,
  controller.listTop
);
destinationsRouter.get(
  "/destinations/:name",
  validateTokenMiddleware,
  controller.find
);
destinationsRouter.post(
  "/destinations/:id/favorite",
  validateTokenMiddleware,
  controller.favorite
);
destinationsRouter.post(
  "/destinations/:id/unfavorite",
  validateTokenMiddleware,
  controller.unfavorite
);
destinationsRouter.get(
  "/destinations/:id/tips",
  validateTokenMiddleware,
  controller.listTips
);

export default destinationsRouter;
