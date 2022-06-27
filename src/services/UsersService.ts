import usersRepository from "../repositories/usersRepository.js";

export default class usersService {
  async register(userId: string) {
    await usersRepository.create(userId);
  }
  async remove(userId: string) {
    await usersRepository.remove(userId);
  }
}
