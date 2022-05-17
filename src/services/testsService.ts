import destiniesRepository from "../repositories/destiniesRepository.js";
import usersRepository from "../repositories/usersRepository.js";
import avatarsRepository from "../repositories/avatarsRepository.js";
import favoritesRepository from "../repositories/favoritesRepository.js";
import reviewsRepository from "../repositories/reviewsRepository.js";
import travelsRepository from "../repositories/travelsRepository.js";

export default class TestsService {
  async trucanteAll() {
    await destiniesRepository.truncate();
    await usersRepository.truncate();
    await avatarsRepository.truncate();
    await favoritesRepository.truncate();
    await reviewsRepository.truncate();
    await travelsRepository.truncate();
  }
}
