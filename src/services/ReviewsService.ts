import reviewsRepository from "../repositories/reviewsRepository.js";
import usersRepository from "../repositories/usersRepository.js";
import destinationsRepository from "../repositories/destinationsRepository.js";
import { badRequest, notFound } from "../errors/index.js";

export default class ReviewsService {
  async add(userId: number, destinationId: number, note: number) {
    await this.#findUserById(userId);
    await this.#findDestinationById(destinationId);
    this.#checkNote(note);

    await reviewsRepository.create({ userId, destinationId, note });
  }

  async #findUserById(userId: number) {
    const user = await usersRepository.findById(userId);
    if (!user) throw notFound("User not found");
  }

  async #findDestinationById(destinationId: number) {
    const destination = await destinationsRepository.findById(destinationId);
    if (!destination) throw notFound("Destination not found");
  }

  async #checkNote(note: number) {
    if (note < 1 || note > 5) throw badRequest("Note out of range");
  }
}
