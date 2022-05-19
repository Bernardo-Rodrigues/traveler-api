import achievementsRepository from "../repositories/achievementsRepository.js";
import achievementsUsersRepository from "../repositories/achievementsUsersRepository.js";

export default class AchievementsService {
  async get(userId: number, destinyId: number) {
    const achievement = await achievementsRepository.find(destinyId);
    await achievementsUsersRepository.create({
      userId,
      achievementId: achievement.id,
    });

    return achievement;
  }
}
