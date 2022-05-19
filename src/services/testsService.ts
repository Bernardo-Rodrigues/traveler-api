import destiniesRepository from "../repositories/destiniesRepository.js";
import usersRepository from "../repositories/usersRepository.js";
import avatarsRepository from "../repositories/avatarsRepository.js";
import favoritesRepository from "../repositories/favoritesRepository.js";
import reviewsRepository from "../repositories/reviewsRepository.js";
import travelsRepository from "../repositories/travelsRepository.js";
import tipsRepository from "../repositories/tipsRepository.js";
import achievementsRepository from "../repositories/achievementsRepository.js";
import achievementsUsersRepository from "../repositories/achievementsUsersRepository.js";

export default class TestsService {
  async trucanteAll() {
    await destiniesRepository.truncate();
    await usersRepository.truncate();
    await avatarsRepository.truncate();
    await favoritesRepository.truncate();
    await reviewsRepository.truncate();
    await travelsRepository.truncate();
    await tipsRepository.truncate();
    await achievementsRepository.truncate();
    await achievementsUsersRepository.truncate();
  }
}
