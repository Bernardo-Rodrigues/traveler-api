import continentsRepository from "../repositories/continentsRepository.js";

export default class ContinentsService {
  async list() {
    const continents = await this.#listContinents();

    return continents;
  }

  async #listContinents() {
    const continents = await continentsRepository.list();
    if (continents.length === 0) throw Error("No continents found");
    return continents;
  }
}
