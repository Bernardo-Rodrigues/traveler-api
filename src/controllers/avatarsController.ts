import { Request, Response } from "express";
import AvatarService from "../services/avatarsService.js";

const service = new AvatarService();

export async function list(req: Request, res: Response) {
  const avatars = await service.list();

  res.send(avatars);
}
