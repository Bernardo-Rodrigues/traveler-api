import avatarsRepository from "../repositories/avatarsRepository.js";
import achievementsUsersRepository from "../repositories/achievementsUsersRepository.js";
import usersRepository from "../repositories/usersRepository.js";
import { notFound } from "../errors/index.js";

export default class AvatarsService {
  async list(section: string, userId: string) {
    const count = await this.#setTripsCount(section, userId);

    const avatars = await this.#listAvatars(count);

    return avatars;
  }

  async #setTripsCount(section: string, userId: string) {
    if (section === "sign-up") return 0;
    else {
      const user = await this.#findUserById(userId);
      const achievements =
        await achievementsUsersRepository.listByDestinationsAchievements(
          user.id
        );
      return achievements.length;
    }
  }

  async #listAvatars(count: number) {
    const avatars = await avatarsRepository.list(count);
    if (avatars.length === 0) throw Error("No avatars found");
    return avatars;
  }

  async #findUserById(userId: string) {
    const user = await usersRepository.findById(userId);
    if (!user) throw notFound("User not found");
    return user;
  }
}
