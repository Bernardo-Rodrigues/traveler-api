import {
  Achievement,
  AchievementUser,
  Avatar,
  Destination,
  Favorite,
  Localization,
  Review,
  Title,
  Travel,
} from ".prisma/client";
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

  const title: Title = await prisma.title.upsert({
    where: {
      text: faker.lorem.word(),
    },
    update: {},
    create: {
      text: faker.lorem.word(),
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
      titleId: title.id,
    },
  });
  user.password = password;

  const localization: Localization = await prisma.localization.upsert({
    where: {
      name: faker.lorem.word(),
    },
    update: {},
    create: {
      name: faker.lorem.word(),
    },
  });

  const destination: Destination = await prisma.destination.upsert({
    where: {
      name: faker.lorem.word(),
    },
    update: {},
    create: {
      name: faker.lorem.word(),
      localizationId: localization.id,
      imageLink: faker.internet.url(),
    },
  });

  const knownDestination: Destination = await prisma.destination.upsert({
    where: {
      name: faker.lorem.word(),
    },
    update: {},
    create: {
      name: faker.lorem.word(),
      localizationId: localization.id,
      imageLink: faker.internet.url(),
    },
  });

  const favorite: Favorite = await prisma.favorite.upsert({
    where: {
      favoriteRelation: {
        userId: user.id,
        destinationId: knownDestination.id,
      },
    },
    update: {},
    create: {
      userId: user.id,
      destinationId: knownDestination.id,
    },
  });

  const travel: Travel = await prisma.travel.upsert({
    where: {
      id: faker.datatype.number(),
    },
    update: {},
    create: {
      userId: user.id,
      destinationId: knownDestination.id,
      startDate: faker.date.past(),
      endDate: faker.date.future(),
    },
  });

  const review: Review = await prisma.review.upsert({
    where: {
      reviewRelation: {
        userId: user.id,
        destinationId: knownDestination.id,
      },
    },
    update: {},
    create: {
      userId: user.id,
      destinationId: knownDestination.id,
      note: 3,
    },
  });

  const achievement: Achievement = await prisma.achievement.upsert({
    where: {
      id: faker.datatype.number(),
    },
    update: {},
    create: {
      destinationId: destination.id,
      name: faker.lorem.words(2),
      description: faker.lorem.words(5),
      imageLink: faker.internet.url(),
    },
  });

  const obtainedAchievement: Achievement = await prisma.achievement.upsert({
    where: {
      id: faker.datatype.number(),
    },
    update: {},
    create: {
      destinationId: knownDestination.id,
      name: faker.lorem.words(2),
      description: faker.lorem.words(5),
      imageLink: faker.internet.url(),
    },
  });

  const achievementUser: AchievementUser = await prisma.achievementUser.upsert({
    where: {
      achievementRelation: {
        userId: user.id,
        achievementId: obtainedAchievement.id,
      },
    },
    update: {},
    create: {
      userId: user.id,
      achievementId: obtainedAchievement.id,
    },
  });

  return {
    avatar,
    destination,
    user,
    review,
    travel,
    favorite,
    knownDestination,
    obtainedAchievement,
    achievement,
    achievementUser,
    title,
    localization,
  };
}
