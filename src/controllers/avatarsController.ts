import { Request, Response } from "express";
import AvatarsService from "../services/AvatarsService.js";

const service = new AvatarsService();

export async function list(req: Request, res: Response) {
  const section = req.query.section as string;
  const username = req.query.username as string;

  const avatars = await service.list(section, username);

  res.send(avatars);
}
