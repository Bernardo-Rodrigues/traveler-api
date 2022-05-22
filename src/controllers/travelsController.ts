import { Request, Response } from "express";
import TravelsService from "../services/TravelsService.js";

const service = new TravelsService();

export async function listUpcomingTrips(req: Request, res: Response) {
  const { userId } = res.locals.user;

  const trips = await service.listUpcomingTrips(userId);

  res.send(trips);
}

export async function addTravel(req: Request, res: Response) {
  const { userId } = res.locals.user;

  await service.addTravel({ ...req.body, userId });

  res.sendStatus(201);
}
