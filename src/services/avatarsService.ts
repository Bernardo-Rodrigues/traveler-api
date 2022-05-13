import avatarsRepository from "../repositories/avatarsRepository.js";

export default class AvatarService {
  async list() {
    const avatars = await avatarsRepository.list();
    if (avatars.length === 0) throw Error("No avatars found");

    return avatars;
  }
}
