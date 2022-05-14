import { Avatar, Destiny } from ".prisma/client";
import { prisma } from "../src/database";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

export default async function seed() {
  const password = faker.lorem.word();
  const avatar: Avatar = await prisma.avatar.upsert({
    where: {
      imageLink: faker.internet.url(),
    },
    update: {},
    create: {
      imageLink: faker.internet.url(),
    },
  });
  const user = await prisma.user.upsert({
    where: {
      username: faker.lorem.word(),
    },
    update: {},
    create: {
      username: faker.lorem.word(),
      avatarId: avatar.id,
      email: faker.internet.email(),
      password: bcrypt.hashSync(password, 12),
    },
  });

  const destiny: Destiny = await prisma.destiny.upsert({
    where: {
      name: faker.lorem.word(),
    },
    update: {},
    create: {
      name: faker.lorem.word(),
      description: faker.lorem.words(5),
      localization: faker.lorem.word(),
      imageLink: faker.internet.url(),
    },
  });

  user.password = password;
  return {
    avatar,
    destiny,
    user,
  };
}
