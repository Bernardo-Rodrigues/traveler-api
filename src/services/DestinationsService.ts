import { badRequest, notFound } from "../errors/index.js";
import destinationsRepository from "../repositories/destinationsRepository.js";
import favoritesRepository from "../repositories/favoritesRepository.js";
import travelsRepository, {
  TravelInsertData,
} from "../repositories/travelsRepository.js";
import usersRepository from "../repositories/usersRepository.js";
import reviewsRepository from "../repositories/reviewsRepository.js";
import achievementsUsersRepository from "../repositories/achievementsUsersRepository.js";
import dayjs from "dayjs";

export default class DestinationsService {
  async list() {
    const hashtable = {};
    const destinations = await destinationsRepository.list();
    if (destinations.length === 0) throw Error("No destinations found");

    const scores = await reviewsRepository.listScores();
    scores.forEach((score) => {
      hashtable[score.destinationId] = score._avg.note;
    });
    const data = destinations.map((destination) => ({
      ...destination,
      score: hashtable[destination.id] ?? 5,
    }));
    return data;
  }
  async find(userId: number, destinationName: string) {
    const destination = await destinationsRepository.get(destinationName);
    if (!destination) throw notFound("Destination not found");

    const data = { ...destination, favorited: false, visited: false, score: 5 };

    const favorited = await favoritesRepository.find(userId, destinationName);
    if (favorited) data.favorited = true;

    const visited = await achievementsUsersRepository.find(
      userId,
      destination.id
    );
    if (visited) data.visited = true;

    const score = await reviewsRepository.find(destination.id);
    if (score._avg.note) data.score = score._avg.note;

    return data;
  }
  async favorite(userId: number, destinationId: number) {
    const user = await usersRepository.findById(userId);
    if (!user) throw notFound("User not found");
    const destination = await destinationsRepository.findById(destinationId);
    if (!destination) throw notFound("Destination not found");

    await favoritesRepository.add(userId, destinationId);
  }
  async unfavorite(userId: number, destinationId: number) {
    const user = await usersRepository.findById(userId);
    if (!user) throw notFound("User not found");
    const destination = await destinationsRepository.findById(destinationId);
    if (!destination) throw notFound("Destination not found");
    await favoritesRepository.remove(userId, destinationId);
  }
  async listFavorites(userId: number) {
    const hashtable = {};
    const user = await usersRepository.findById(userId);
    if (!user) throw notFound("User not found");
    const favorites = await favoritesRepository.listByUser(userId);
    const scores = await reviewsRepository.listScores();
    scores.forEach((score) => {
      hashtable[score.destinationId] = score._avg.note;
    });
    const destinations = favorites.map((favorite) => ({
      ...favorite.destination,
      score: hashtable[favorite.destination.id] ?? 5,
    }));
    return destinations;
  }
  async listTop() {
    const destinations = await this.list();
    const topDestinations = destinations.sort((a, b) => b.score - a.score);

    return topDestinations;
  }
  async addTravel(data: TravelInsertData) {
    const user = await usersRepository.findById(data.userId);
    if (!user) throw notFound("User not found");
    const destination = await destinationsRepository.findById(
      data.destinationId
    );
    if (!destination) throw notFound("Destination not found");

    const validDates = this.checkDates(data.startDate, data.endDate);
    if (!validDates) throw badRequest("Dates are invalid");

    await travelsRepository.add(data);
  }

  checkDates(startDate: Date, endDate: Date) {
    return !(startDate && dayjs(startDate).isAfter(endDate));
  }
}
