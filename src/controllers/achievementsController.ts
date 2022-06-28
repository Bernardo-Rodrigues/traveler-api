import { Response } from "express";
import AuthenticatedRequest from "../interfaces/AuthenticatedRequest.js";
import AchievementService from "../services/AchievementService.js";

const service = new AchievementService();

export async function get(req: AuthenticatedRequest, res: Response) {
  const destinationId = parseInt(req.params.id);
  const { userId } = req.auth;

  const achievements = await service.get(userId, destinationId);

  res.status(201).send(achievements);
}

export async function listByUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req.auth;

  const achievements = await service.listByUser(userId);

  res.send(achievements);
}
