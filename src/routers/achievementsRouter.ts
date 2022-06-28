import { Router } from "express";
import * as controller from "../controllers/achievementsController.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const achievementsRouter = Router();

achievementsRouter.get(
  "/achievements/destinations/:id",
  ClerkExpressRequireAuth(),
  controller.get
);
achievementsRouter.get(
  "/achievements",
  ClerkExpressRequireAuth(),
  controller.listByUser
);

export default achievementsRouter;
