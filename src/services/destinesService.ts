import destiniesRepository from "../repositories/destiniesRepository.js";

export default class DestiniesService {
  async list() {
    const destinies = await destiniesRepository.list();
    if (destinies.length === 0) throw Error("No destinies found");

    return destinies;
  }
}
