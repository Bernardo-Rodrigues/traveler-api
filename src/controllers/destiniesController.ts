import { Request, Response } from "express";
import DestinesService from "../services/destinesService.js";

const service = new DestinesService();

export async function list(req: Request, res: Response) {
  const destinies = await service.list();

  res.send(destinies);
}

export async function listByFavorites(req: Request, res: Response) {
  const { userId } = res.locals.user;

  const favorites = await service.listFavorites(userId);

  res.send(favorites);
}

export async function find(req: Request, res: Response) {
  const { userId } = res.locals.user;
  const { name } = req.params;

  const destinies = await service.find(userId, name);

  res.send(destinies);
}

export async function favorite(req: Request, res: Response) {
  const { userId } = res.locals.user;
  const destinationId = parseInt(req.params.id);

  await service.favorite(userId, destinationId);

  res.sendStatus(200);
}

export async function unfavorite(req: Request, res: Response) {
  const { userId } = res.locals.user;
  const destinationId = parseInt(req.params.id);

  await service.unfavorite(userId, destinationId);

  res.sendStatus(200);
}
