import { Avatar } from ".prisma/client";
import { prisma } from "../src/database";
import { faker } from "@faker-js/faker";

export default async function seed() {
  const avatar: Avatar = await prisma.avatar.upsert({
    where: {
      imageLink: faker.internet.url(),
    },
    update: {},
    create: {
      imageLink: faker.internet.url(),
    },
  });

  return {
    avatar,
  };
}
