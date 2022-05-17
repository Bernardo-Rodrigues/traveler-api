import { notFound } from "../errors/index.js";
import destiniesRepository from "../repositories/destiniesRepository.js";
import favoritesRepository from "../repositories/favoritesRepository.js";
import travelsRepository from "../repositories/travelsRepository.js";
import usersRepository from "../repositories/usersRepository.js";
import reviewsRepository from "../repositories/reviewsRepository.js";
import { favorite } from "../controllers/destiniesController.js";

export default class DestiniesService {
  async list() {
    const hashtable = {};
    const destinies = await destiniesRepository.list();
    if (destinies.length === 0) throw Error("No destinies found");

    const scores = await reviewsRepository.listScores();
    scores.forEach((score) => {
      hashtable[score.destinyId] = score._avg.note;
    });
    const data = destinies.map((destination) => ({
      ...destination,
      score: hashtable[destination.id] ?? 5,
    }));
    return data;
  }
  async find(userId: number, destinationName: string) {
    const destiny = await destiniesRepository.get(destinationName);
    if (!destiny) throw notFound("Destiny not found");

    const data = { ...destiny, favorited: false, visited: false, score: 5 };

    const favorited = await favoritesRepository.find(userId, destinationName);
    if (favorited) data.favorited = true;

    const visited = await travelsRepository.find(userId, destiny.id);
    if (visited) data.visited = true;

    const score = await reviewsRepository.find(destiny.id);
    if (score._avg.note) data.score = score._avg.note;

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
  async listFavorites(userId: number) {
    const hashtable = {};
    const user = await usersRepository.findById(userId);
    if (!user) throw notFound("User not found");
    const favorites = await favoritesRepository.listByUser(userId);
    const scores = await reviewsRepository.listScores();
    scores.forEach((score) => {
      hashtable[score.destinyId] = score._avg.note;
    });
    const destinies = favorites.map((favorite) => ({
      ...favorite.destiny,
      score: hashtable[favorite.destiny.id] ?? 5,
    }));
    return destinies;
  }
  async listTop() {
    const destinies = await this.list();
    const topDestinies = destinies.sort((a, b) => b.score - a.score);

    return topDestinies;
  }
}
