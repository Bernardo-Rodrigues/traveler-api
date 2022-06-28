import { Request, Response } from "express";
import UsersService from "../services/UsersService.js";

const service = new UsersService();

export async function register(req: Request, res: Response) {
  const userId = req.body.data.id;

  await service.register(userId);

  res.sendStatus(201);
}

export async function remove(req: Request, res: Response) {
  const userId = req.body.data.id;

  await service.remove(userId);

  res.sendStatus(200);
}
