import { notFound } from "../errors/index.js";
import travelsRepository from "../repositories/travelsRepository.js";
import usersRepository from "../repositories/usersRepository.js";
import tipsRepository from "../repositories/tipsRepository.js";

export default class TravelsService {
  async listUpcomingTrips(userId: number) {
    const user = await usersRepository.findById(userId);
    if (!user) throw notFound("User not found");

    const trips = await travelsRepository.listUpcomingTrips(userId);

    return trips;
  }

  async listTipsByDestination(destinyId: number) {
    const tips = await tipsRepository.listTipsByDestination(destinyId);
    return tips;
  }
}
