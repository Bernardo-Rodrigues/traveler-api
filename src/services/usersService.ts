import { conflict, unauthorized } from "../errors/index.js";
import { UserInsertData } from "../repositories/usersRepository.js";
import userRepository from "../repositories/usersRepository.js";
import travelsRepository from "../repositories/travelsRepository.js";
import config from "../config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class usersService {
  async register(userData: UserInsertData) {
    const { username, email, password } = userData;
    const user =
      (await userRepository.findByEmail(email)) ||
      (await userRepository.findByName(username));
    if (user) throw conflict("User already registered");

    const hashedPassword = bcrypt.hashSync(password, 12);
    await userRepository.create({
      ...userData,
      password: hashedPassword,
    });
  }

  async login({ email, password }) {
    const user = await this.#validateUserLogin(email, password);
    const token = this.#createJWTToken(user.id);

    const currentTravel = await this.#isInTravel(user.id);

    return {
      token,
      username: user.username,
      imageLink: user.avatar.imageLink,
      currentTravel,
    };
  }

  async #validateUserLogin(email: string, password: string) {
    const user = await userRepository.findByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password))
      throw unauthorized("User does not exist");

    return user;
  }

  #createJWTToken(userId: number) {
    const jwtConfiguration = { expiresIn: 60 * 60 };
    const jwtData = { userId };
    const token = jwt.sign(jwtData, config.secretJWT, jwtConfiguration);
    return token;
  }

  async #isInTravel(userId: number) {
    const currentTravel = await travelsRepository.findCurrentTravel(userId);
    if (!currentTravel) return null;
    return currentTravel;
  }
}
