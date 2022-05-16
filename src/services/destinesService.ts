import { notFound } from "../errors/index.js";
import destiniesRepository from "../repositories/destiniesRepository.js";
import favoritesRepository from "../repositories/favoritesRepository.js";
import travelsRepository from "../repositories/travelsRepository.js";
import usersRepository from "../repositories/usersRepository.js";

export default class DestiniesService {
  async list() {
    const destinies = await destiniesRepository.list();
    if (destinies.length === 0) throw Error("No destinies found");

    return destinies;
  }
  async find(userId: number, destinationName: string) {
    const destiny = await destiniesRepository.get(destinationName);
    if (!destiny) throw notFound("Destiny not found");

    const data = { ...destiny, favorited: false, visited: false };

    const favorited = await favoritesRepository.find(userId, destinationName);
    if (favorited) data.favorited = true;

    const visited = await travelsRepository.find(userId, destiny.id);
    if (visited) data.visited = true;

    return data;
  }
  async favorite(userId: number, destinationId: number) {
    const user = await usersRepository.findById(userId);
    if (!user) throw notFound("User not found");
    const destination = await destiniesRepository.findById(destinationId);
    if (!destination) throw notFound("Destiny not found");

    await favoritesRepository.add(userId, destinationId);
  }
  async unfavorite(userId: number, destinationId: number) {
    const user = await usersRepository.findById(userId);
    if (!user) throw notFound("User not found");
    const destination = await destiniesRepository.findById(destinationId);
    if (!destination) throw notFound("Destiny not found");
    await favoritesRepository.remove(userId, destinationId);
  }
}
