import { Request, Response } from "express";
import TravelsService from "../services/travelsService.js";

const service = new TravelsService();

export async function listUpcomingTrips(req: Request, res: Response) {
  const { userId } = res.locals.user;

  const trips = await service.listUpcomingTrips(userId);

  res.send(trips);
}
