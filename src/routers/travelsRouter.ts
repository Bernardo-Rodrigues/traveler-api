import { Router } from "express";
import * as controller from "../controllers/travelsController.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const travelsRouter = Router();

travelsRouter.get(
  "/travels",
  ClerkExpressRequireAuth(),
  controller.listUpcomingTrips
);

travelsRouter.get(
  "/travels/current",
  ClerkExpressRequireAuth(),
  controller.getCurrentTrip
);

travelsRouter.post("/travels", ClerkExpressRequireAuth(), controller.addTravel);

export default travelsRouter;
