import { conflict, notFound, unauthorized } from "../errors/index.js";
import { UserInsertData } from "../repositories/usersRepository.js";
import usersRepository from "../repositories/usersRepository.js";
import travelsRepository from "../repositories/travelsRepository.js";
import config from "../config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import avatarsRepository from "../repositories/avatarsRepository.js";
import titlesRepository from "../repositories/titlesRepository.js";

export default class usersService {
  async register(userData: UserInsertData) {
    const { username, email, password } = userData;

    await this.#findUserByNameOrEmail(email, username);

    const hashedPassword = bcrypt.hashSync(password, 12);
    await usersRepository.create({
      ...userData,
      password: hashedPassword,
    });
  }

  async login({ email, password }) {
    const user = await this.#validateUserLogin(email, password);
    const token = this.#createJWTToken(user.id);
    const currentTrip = await this.#isInTravel(user.id);

    return {
      token,
      username: user.username,
      imageLink: user.avatar.imageLink,
      title: user.title.text,
      currentTrip: currentTrip,
    };
  }

  async edit({ username, avatarId, title }, userId: number) {
    await this.#findUserById(userId);
    await this.#findUserByNameOrEmail("", username);
    const avatar = await this.#validateAvatar(avatarId);
    const titleId = await this.#findTitle(title);

    await usersRepository.edit(userId, { username, avatarId, titleId });

    return {
      username: username,
      imageLink: avatar.imageLink,
      title: title,
    };
  }

  async #validateAvatar(avatarId: number) {
    const avatar = await avatarsRepository.findById(avatarId);

    if (!avatar) throw notFound("Avatar not found");

    return avatar;
  }

  async #findTitle(text: string) {
    const title = await titlesRepository.findByText(text);

    if (!title) throw notFound("Title not found");

    return title.id;
  }

  async #findUserByNameOrEmail(email: string, username: string) {
    const user =
      (await usersRepository.findByEmail(email)) ||
      (await usersRepository.findByName(username));

    if (user) throw conflict("User already registered");
  }

  async #validateUserLogin(email: string, password: string) {
    const user = await usersRepository.findByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password))
      throw unauthorized("User does not exist");

    return user;
  }

  async #findUserById(userId: number) {
    const user = await usersRepository.findById(userId);
    if (!user) throw notFound("User not found");
  }

  #createJWTToken(userId: number) {
    const jwtConfiguration = { expiresIn: 60 * 60 };
    const jwtData = { userId };
    const token = jwt.sign(jwtData, config.secretJWT, jwtConfiguration);
    return token;
  }

  async #isInTravel(userId: number) {
    const currentTrip = await travelsRepository.findCurrentTrip(userId);
    if (!currentTrip) return null;
    return currentTrip;
  }
}
