import { faker } from "@faker-js/faker";

export function createUser(avatarId?: number) {
  return {
    username: faker.lorem.word(),
    avatarId: avatarId ?? 1,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
