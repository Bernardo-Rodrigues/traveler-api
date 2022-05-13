import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database";
import { UserInsertData } from "../../src/repositories/usersRepository";
import bcrypt from "bcrypt";

export function createUser(avatarId?: number) {
  return {
    username: faker.lorem.word(),
    avatarId: avatarId ?? 1,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
export async function insertUser(user: UserInsertData) {
  await prisma.user.create({
    data: {
      ...user,
      password: bcrypt.hashSync(user.password, 12),
    },
  });
}
export function createLogin() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
