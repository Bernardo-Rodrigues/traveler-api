import { faker } from "@faker-js/faker";

export function createUser(avatarId?: number, titleId?: number) {
  return {
    username: faker.lorem.word(),
    avatarId: avatarId ?? 1,
    email: faker.internet.email(),
    password: faker.internet.password(),
    titleId: titleId ?? 1,
  };
}
