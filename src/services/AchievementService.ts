import achievementsRepository from "../repositories/achievementsRepository.js";
import achievementsUsersRepository from "../repositories/achievementsUsersRepository.js";
import usersRepository from "../repositories/usersRepository.js";
import destinationsRepository from "../repositories/destinationsRepository.js";
import { notFound } from "../errors/index.js";

export default class AchievementsService {
  async get(userId: number, destinationId: number) {
    const user = await usersRepository.findById(userId);
    if (!user) throw notFound("User not found");
    const destination = await destinationsRepository.findById(destinationId);
    if (!destination) throw notFound("Destination not found");

    const achievement = await achievementsRepository.findByDestination(
      destinationId
    );
    await achievementsUsersRepository.create({
      userId,
      achievementId: achievement.id,
    });

    return achievement;
  }

  async listByUser(userId: number) {
    const user = await usersRepository.findById(userId);
    if (!user) throw notFound("User not found");
    const achievements = await achievementsUsersRepository.listByUser(userId);

    return achievements;
  }
}
