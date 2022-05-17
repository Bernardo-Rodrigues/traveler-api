import { Avatar, Destiny, Favorite, Review, Travel } from ".prisma/client";
import { prisma } from "../src/database";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

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
  const password = faker.lorem.word();
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
  user.password = password;

  const destiny: Destiny = await prisma.destiny.upsert({
    where: {
      name: faker.lorem.word(),
    },
    update: {},
    create: {
      name: faker.lorem.word(),
      localization: faker.lorem.word(),
      imageLink: faker.internet.url(),
    },
  });

  const knownDestiny: Destiny = await prisma.destiny.upsert({
    where: {
      name: faker.lorem.word(),
    },
    update: {},
    create: {
      name: faker.lorem.word(),
      localization: faker.lorem.word(),
      imageLink: faker.internet.url(),
    },
  });

  const favorite: Favorite = await prisma.favorite.upsert({
    where: {
      favoriteRelation: {
        userId: user.id,
        destinyId: knownDestiny.id,
      },
    },
    update: {},
    create: {
      userId: user.id,
      destinyId: knownDestiny.id,
    },
  });

  const travel: Travel = await prisma.travel.upsert({
    where: {
      id: faker.datatype.number(),
    },
    update: {},
    create: {
      userId: user.id,
      destinyId: knownDestiny.id,
    },
  });

  const review: Review = await prisma.review.upsert({
    where: {
      id: faker.datatype.number(),
    },
    update: {},
    create: {
      userId: user.id,
      destinyId: knownDestiny.id,
      note: 3,
    },
  });

  return {
    avatar,
    destiny,
    user,
    review,
    travel,
    favorite,
    knownDestiny,
  };
}
