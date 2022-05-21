import reviewsRepository from "../repositories/reviewsRepository.js";

export default class ReviewsService {
  async add(userId: number, destinationId: number, note: number) {
    await reviewsRepository.create({ userId, destinationId, note });
  }
}
