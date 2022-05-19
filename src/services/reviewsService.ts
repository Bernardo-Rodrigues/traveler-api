import reviewsRepository from "../repositories/reviewsRepository.js";

export default class ReviewsService {
  async add(userId: number, destinyId: number, note: number) {
    await reviewsRepository.create({ userId, destinyId, note });
  }
}
