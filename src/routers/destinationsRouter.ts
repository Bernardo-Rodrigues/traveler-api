import { Router } from "express";
import * as controller from "../controllers/destinationsController.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const destinationsRouter = Router();

destinationsRouter.get(
  "/destinations",
  ClerkExpressRequireAuth(),
  controller.list
);
destinationsRouter.get(
  "/destinations/favorites",
  ClerkExpressRequireAuth(),
  controller.listByFavorites
);
destinationsRouter.get(
  "/destinations/top",
  ClerkExpressRequireAuth(),
  controller.listTop
);
destinationsRouter.get(
  "/destinations/:name",
  ClerkExpressRequireAuth(),
  controller.find
);
destinationsRouter.post(
  "/destinations/:id/favorite",
  ClerkExpressRequireAuth(),
  controller.favorite
);
destinationsRouter.post(
  "/destinations/:id/unfavorite",
  ClerkExpressRequireAuth(),
  controller.unfavorite
);
destinationsRouter.get(
  "/destinations/:id/tips",
  ClerkExpressRequireAuth(),
  controller.listTips
);

export default destinationsRouter;
