import { notFound } from "../errors/index.js";
import travelsRepository from "../repositories/travelsRepository.js";
import usersRepository from "../repositories/usersRepository.js";

export default class TravelsService {
  async listUpcomingTrips(userId: number) {
    const user = await usersRepository.findById(userId);
    if (!user) throw notFound("User not found");

    const trips = await travelsRepository.listUpcomingTrips(userId);

    return trips;
  }
}
