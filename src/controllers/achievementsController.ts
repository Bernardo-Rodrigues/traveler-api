import { Request, Response } from "express";
import achievementService from "../services/achievementService.js";

const service = new achievementService();

export async function get(req: Request, res: Response) {
  const destinationId = parseInt(req.params.id);
  const { userId } = res.locals.user;

  const achievement = await service.get(userId, destinationId);

  res.status(201).send(achievement);
}
