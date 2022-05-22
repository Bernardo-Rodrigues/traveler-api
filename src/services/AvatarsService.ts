import avatarsRepository from "../repositories/avatarsRepository.js";
import achievementsUsersRepository from "../repositories/achievementsUsersRepository.js";
import usersRepository from "../repositories/usersRepository.js";
import { notFound } from "../errors/index.js";

export default class AvatarsService {
  async list(section: string, username: string) {
    const count = await this.#setTripsCount(section, username);

    const avatars = await this.#listAvatars(count);

    return avatars;
  }

  async #setTripsCount(section: string, username: string) {
    if (section === "sign-up") return 0;
    else {
      await this.#findUserByName(username);
      const achievements = await achievementsUsersRepository.listByUsername(
        username
      );
      return achievements.length;
    }
  }

  async #listAvatars(count: number) {
    const avatars = await avatarsRepository.list(count);
    if (avatars.length === 0) throw Error("No avatars found");
    return avatars;
  }

  async #findUserByName(username: string) {
    const user = await usersRepository.findByName(username);
    if (!user) throw notFound("User not found");
  }
}
