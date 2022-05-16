import { notFound } from "../errors/index.js";
import destiniesRepository from "../repositories/destiniesRepository.js";

export default class DestiniesService {
  async list() {
    const destinies = await destiniesRepository.list();
    if (destinies.length === 0) throw Error("No destinies found");

    return destinies;
  }
  async find(name: string) {
    const destiny = await destiniesRepository.find(name);
    if (!destiny) throw notFound("Destiny not found");

    return destiny;
  }
}
