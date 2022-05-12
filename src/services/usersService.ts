import { conflict } from "../errors/index.js";
import { UserInsertData } from "../repositories/usersRepository.js";
import userRepository from "../repositories/usersRepository.js";
import config from "../config.js";
import Cryptr from "cryptr";

const cryptr = new Cryptr(config.secretCryptr);

export default class usersService {
  async register(userData: UserInsertData) {
    const { username, email, password } = userData;
    const user =
      (await userRepository.findByEmail(email)) ||
      (await userRepository.findByName(username));
    if (user) throw conflict("User already registered");

    const encryptedPassword = cryptr.encrypt(password);
    await userRepository.create({
      ...userData,
      password: encryptedPassword,
    });
  }
}
