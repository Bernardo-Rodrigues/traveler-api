import { Request, Response } from "express";
import AvatarsService from "../services/avatarsService.js";

const service = new AvatarsService();

export async function list(req: Request, res: Response) {
  const avatars = await service.list();

  res.send(avatars);
}
