import achievementsRepository from "../repositories/achievementsRepository.js";
import achievementsUsersRepository from "../repositories/achievementsUsersRepository.js";
import usersRepository from "../repositories/usersRepository.js";
import destinationsRepository from "../repositories/destinationsRepository.js";
import { notFound } from "../errors/index.js";

export default class AchievementsService {
  async get(userId: string, destinationId: number) {
    await this.#findUserById(userId);
    await this.#findDestinationById(destinationId);
    const achievement = await this.#findAchievementByDestination(destinationId);
    const userAlreadyHaveTheAchievement = await this.#haveTheAchievement(
      userId,
      achievement.id
    );

    if (userAlreadyHaveTheAchievement) return null;

    await achievementsUsersRepository.create({
      userId,
      achievementId: achievement.id,
    });

    const destinationsAchievements =
      await achievementsUsersRepository.listByDestinationsAchievements(userId);
    const countAchievement = await achievementsRepository.findByCount(
      destinationsAchievements.length
    );

    if (countAchievement) {
      await achievementsUsersRepository.create({
        userId,
        achievementId: countAchievement.id,
      });
    }

    return [achievement, countAchievement];
  }

  async listByUser(userId: string) {
    await this.#findUserById(userId);

    const achievements = await achievementsUsersRepository.listByUserId(userId);
    return achievements;
  }

  async #haveTheAchievement(userId: string, achievementId: number) {
    const alreadyHave = await achievementsUsersRepository.find(
      userId,
      achievementId
    );
    if (alreadyHave) return true;
    return false;
  }

  async #findUserById(userId: string) {
    const user = await usersRepository.findById(userId);
    if (!user) throw notFound("User not found");
  }

  async #findDestinationById(destinationId: number) {
    const destination = await destinationsRepository.findById(destinationId);
    if (!destination) throw notFound("Destination not found");
  }

  async #findAchievementByDestination(destinationId: number) {
    const achievement = await achievementsRepository.findByDestination(
      destinationId
    );

    if (!achievement) throw Error("Destination does not have achievements");

    return achievement;
  }
}
