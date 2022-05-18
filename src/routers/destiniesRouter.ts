import { Router } from "express";
import * as controller from "../controllers/destiniesController.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const destiniesRouter = Router();

destiniesRouter.get("/destinies", validateTokenMiddleware, controller.list);
destiniesRouter.get(
  "/destinies/favorites",
  validateTokenMiddleware,
  controller.listByFavorites
);
destiniesRouter.get(
  "/destinies/top",
  validateTokenMiddleware,
  controller.listTop
);
destiniesRouter.get(
  "/destinies/:name",
  validateTokenMiddleware,
  controller.find
);
destiniesRouter.post(
  "/destinies/:id/favorite",
  validateTokenMiddleware,
  controller.favorite
);
destiniesRouter.post(
  "/destinies/:id/unfavorite",
  validateTokenMiddleware,
  controller.unfavorite
);
destiniesRouter.post(
  "/destinies/:id/travel",
  validateTokenMiddleware,
  controller.addTravel
);

export default destiniesRouter;
