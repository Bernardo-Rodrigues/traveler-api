import { conflict, unauthorized } from "../errors/index.js";
import { UserInsertData } from "../repositories/usersRepository.js";
import userRepository from "../repositories/usersRepository.js";
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
    const userId = await this.#validateUserLogin(email, password);
    const token = this.#createJWTToken(userId);

    return { token };
  }

  async #validateUserLogin(email: string, password: string) {
    const user = await userRepository.findByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password))
      throw unauthorized("User does not exist");

    return user.id;
  }

  #createJWTToken(userId: number) {
    const jwtConfiguration = { expiresIn: 60 * 60 };
    const jwtData = { userId };
    const token = jwt.sign(jwtData, config.secretJWT, jwtConfiguration);
    return token;
  }
}
