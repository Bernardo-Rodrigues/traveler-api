import { notFound } from "../errors/index.js";
import destinationsRepository from "../repositories/destinationsRepository.js";
import favoritesRepository from "../repositories/favoritesRepository.js";
import usersRepository from "../repositories/usersRepository.js";
import reviewsRepository from "../repositories/reviewsRepository.js";
import tipsRepository from "../repositories/tipsRepository.js";
import continentsRepository from "../repositories/continentsRepository.js";
import achievementsUsersRepository from "../repositories/achievementsUsersRepository.js";
import { Destination } from ".prisma/client";

export default class DestinationsService {
  async list(name: string) {
    let destinations: Destination[];

    if (name === "null" || name === "")
      destinations = await this.#findDestinations();
    else destinations = await this.#findDestinationsByName(name);

    const destinationsWithScores = await this.#includeScoresInDestinations(
      destinations
    );

    return destinationsWithScores;
  }

  async listTop(userId: string, continentName: string) {
    await this.#findUserById(userId);
    const continent = await this.#checkContinent(continentName);
    let destinations: Destination[];

    if (continent)
      destinations = await this.#findDestinationsByContinent(continentName);
    else destinations = await this.#findDestinations();

    const destinationsWithScores = await this.#includeScoresInDestinations(
      destinations
    );

    const topDestinations = destinationsWithScores.sort(
      (a, b) => b.score - a.score
    );

    return topDestinations;
  }

  async #checkContinent(continentName: string) {
    if (
      !continentName ||
      continentName === "undefined" ||
      continentName === "null"
    )
      return false;
    const continent = await continentsRepository.findByName(continentName);

    if (!continent) throw notFound("Continent not found");
    return true;
  }

  async find(userId: string, destinationName: string) {
    await this.#findUserById(userId);
    const destination = await this.#findDestinationByName(destinationName);

    const destinationWithUserInformations = await this.#setExtraInformations(
      destination,
      userId
    );

    return destinationWithUserInformations;
  }

  async favorite(userId: string, destinationId: number) {
    await this.#findUserById(userId);
    await this.#findDestinationById(destinationId);

    await favoritesRepository.add(userId, destinationId);
  }
  async unfavorite(userId: string, destinationId: number) {
    await this.#findUserById(userId);
    await this.#findDestinationById(destinationId);

    await favoritesRepository.remove(userId, destinationId);
  }
  async listFavorites(userId: string) {
    await this.#findUserById(userId);

    const favorites = await favoritesRepository.listByUser(userId);
    const favoritesWithScore = await this.#includeScoresInFavorites(favorites);

    return favoritesWithScore;
  }

  async listTips(destinationId: number) {
    await this.#findDestinationById(destinationId);

    const tips = await tipsRepository.listTipsByDestination(destinationId);
    return tips;
  }

  async #findUserById(userId: string) {
    const user = await usersRepository.findById(userId);
    if (!user) throw notFound("User not found");
  }

  async #findDestinationById(destinationId: number) {
    const destination = await destinationsRepository.findById(destinationId);
    if (!destination) throw notFound("Destination not found");
  }

  async #findDestinations() {
    const destinations = await destinationsRepository.list();
    if (destinations.length === 0) throw Error("No destinations found");

    return destinations;
  }

  async #findDestinationsByName(name: string) {
    const destinations = await destinationsRepository.listByName(name);

    return destinations;
  }

  async #findDestinationsByContinent(continentName: string) {
    const destinations = await destinationsRepository.listByContinent(
      continentName
    );
    if (destinations.length === 0) throw Error("No destinations found");

    return destinations;
  }

  async #findDestinationByName(destinationName: string) {
    const destination = await destinationsRepository.getByName(destinationName);
    if (!destination) throw notFound("Destination not found");
    return destination;
  }

  async #includeScoresInDestinations(destinations: Destination[]) {
    const hashtable = {};
    const scores = await reviewsRepository.listScores();

    scores.forEach((score) => {
      hashtable[score.destinationId] = score._avg.note;
    });

    const destinationsWithScores = destinations.map((destination) => ({
      ...destination,
      score: hashtable[destination.id] ?? 5,
    }));

    return destinationsWithScores;
  }
  async #includeScoresInFavorites(favorites: any) {
    const hashtable = {};
    const scores = await reviewsRepository.listScores();

    scores.forEach((score) => {
      hashtable[score.destinationId] = score._avg.note;
    });

    const favoritesWithScores = favorites.map((favorite: any) => ({
      ...favorite.destination,
      score: hashtable[favorite.destination.id] ?? 5,
    }));

    return favoritesWithScores;
  }

  async #setExtraInformations(destination: Destination, userId: string) {
    const destinationWithUserInformations = {
      ...destination,
      favorited: false,
      visited: false,
      score: 5,
      personalRate: 0,
    };

    const favorited = await favoritesRepository.find(userId, destination.name);
    if (favorited) destinationWithUserInformations.favorited = true;

    const visited = await achievementsUsersRepository.find(
      userId,
      destination.id
    );
    if (visited) destinationWithUserInformations.visited = true;

    const personalRate = await reviewsRepository.findByUser(
      userId,
      destination.id
    );
    if (personalRate)
      destinationWithUserInformations.personalRate = personalRate.note;

    const score = await reviewsRepository.find(destination.id);
    if (score._avg.note)
      destinationWithUserInformations.score = score._avg.note;

    return destinationWithUserInformations;
  }
}
