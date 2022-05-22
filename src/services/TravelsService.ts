import { badRequest, notFound } from "../errors/index.js";
import travelsRepository, {
  TravelInsertData,
} from "../repositories/travelsRepository.js";
import usersRepository from "../repositories/usersRepository.js";
import destinationsRepository from "../repositories/destinationsRepository.js";
import dayjs from "dayjs";

export default class TravelsService {
  async listUpcomingTrips(userId: number) {
    await this.#findUserById(userId);

    const trips = await travelsRepository.listUpcomingTrips(userId);
    return trips;
  }

  async addTravel(data: TravelInsertData) {
    await this.#findUserById(data.userId);
    await this.#findDestinationById(data.destinationId);

    const validDates = this.checkDates(data.startDate, data.endDate);
    if (!validDates) throw badRequest("Dates are invalid");

    await this.#checkTripsConflict(data.userId, data.startDate, data.endDate);

    await travelsRepository.add(data);
  }

  checkDates(startDate: Date, endDate: Date) {
    return !(
      (startDate && dayjs(startDate).isAfter(endDate)) ||
      dayjs().subtract(1, "day").isAfter(endDate)
    );
  }

  async #findDestinationById(destinationId: number) {
    const destination = await destinationsRepository.findById(destinationId);
    if (!destination) throw notFound("Destination not found");
  }

  async #checkTripsConflict(userId: number, startdDate: Date, endDate: Date) {
    const haveConflict = await travelsRepository.findByDate(
      userId,
      startdDate,
      endDate
    );
    if (haveConflict)
      throw badRequest("Conflict with dates of different trips");
  }

  async #findUserById(userId: number) {
    const user = await usersRepository.findById(userId);
    if (!user) throw notFound("User not found");
  }
}
