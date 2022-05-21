import { Request, Response } from "express";
import TravelsService from "../services/TravelsService.js";

const service = new TravelsService();

export async function listUpcomingTrips(req: Request, res: Response) {
  const { userId } = res.locals.user;

  const trips = await service.listUpcomingTrips(userId);

  res.send(trips);
}

export async function listTipsByDestination(req: Request, res: Response) {
  const destinationId = parseInt(req.params.id);

  const tips = await service.listTipsByDestination(destinationId);

  res.send(tips);
}
