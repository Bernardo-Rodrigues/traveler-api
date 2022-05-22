import titlesRepository from "../repositories/titlesRepository.js";
import achievementsUsersRepository from "../repositories/achievementsUsersRepository.js";
import usersRepository from "../repositories/usersRepository.js";
import { notFound } from "../errors/index.js";

export default class TitlesService {
  async list(username: string) {
    const count = await this.#setTripsCount(username);

    const titles = await this.#listTitles(count);

    return titles;
  }

  async #setTripsCount(username: string) {
    const user = await this.#findUserByName(username);
    const achievements =
      await achievementsUsersRepository.listByDestinationsAchievements(user.id);
    return achievements.length;
  }

  async #listTitles(count: number) {
    const titles = await titlesRepository.list(count);
    if (titles.length === 0) throw Error("No titles found");
    return titles;
  }

  async #findUserByName(username: string) {
    const user = await usersRepository.findByName(username);
    if (!user) throw notFound("User not found");
    return user;
  }
}
