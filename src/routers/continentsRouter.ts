import { Router } from "express";
import * as controller from "../controllers/continentsController.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const continentsRouter = Router();

continentsRouter.get("/continents", ClerkExpressRequireAuth(), controller.list);

export default continentsRouter;
