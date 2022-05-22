import { Router } from "express";
import achievementsRouter from "./achievementsRouter.js";
import avatarsRouter from "./avatarsRouter.js";
import continentsRouter from "./continentsRouter.js";
import destinationsRouter from "./destinationsRouter.js";
import reviewsRouter from "./reviewsRouter.js";
import titlesRouter from "./titlesRouter.js";
import travelsRouter from "./travelsRouter.js";
import usersRouter from "./usersRouter.js";

const router = Router();

router.use(avatarsRouter);
router.use(usersRouter);
router.use(destinationsRouter);
router.use(travelsRouter);
router.use(achievementsRouter);
router.use(reviewsRouter);
router.use(continentsRouter);
router.use(titlesRouter);

export default router;
