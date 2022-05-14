import destiniesRepository from "../repositories/destiniesRepository.js";
import usersRepository from "../repositories/usersRepository.js";
import avatarsRepository from "../repositories/avatarsRepository.js";

export default class TestsService {
  async trucanteAll() {
    await destiniesRepository.truncate();
    await usersRepository.truncate();
    await avatarsRepository.truncate();
  }
}
