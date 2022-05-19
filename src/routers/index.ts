import { Router } from "express";
import achievementsRouter from "./achievementsRouter.js";
import avatarsRouter from "./avatarsRouter.js";
import destiniesRouter from "./destiniesRouter.js";
import reviewsRouter from "./reviewsRouter.js";
import travelsRouter from "./travelsRouter.js";
import usersRouter from "./usersRouter.js";

const router = Router();

router.use(avatarsRouter);
router.use(usersRouter);
router.use(destiniesRouter);
router.use(travelsRouter);
router.use(achievementsRouter);
router.use(reviewsRouter);

export default router;
