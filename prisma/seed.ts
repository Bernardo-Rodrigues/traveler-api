import {
  Achievement,
  AchievementUser,
  Avatar,
  Continent,
  Country,
  Destination,
  Favorite,
  Review,
  Travel,
} from ".prisma/client";
import { prisma } from "../src/database";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

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

  const user = await prisma.user.upsert({
    where: {
      id: faker.lorem.word(),
    },
    update: {},
    create: {
      id: faker.lorem.word(),
    },
  });

  const continent: Continent = await prisma.continent.upsert({
    where: {
      name: faker.lorem.word(),
    },
    update: {},
    create: {
      name: faker.lorem.word(),
    },
  });

  const country: Country = await prisma.country.upsert({
    where: {
      name: faker.lorem.word(),
    },
    update: {},
    create: {
      name: faker.lorem.word(),
      continentId: continent.id,
    },
  });

  const destination: Destination = await prisma.destination.upsert({
    where: {
      name: faker.lorem.words(2),
    },
    update: {},
    create: {
      name: faker.lorem.words(2),
      countryId: country.id,
      imageLink: faker.internet.url(),
    },
  });

  const knownDestination: Destination = await prisma.destination.upsert({
    where: {
      name: faker.lorem.words(2),
    },
    update: {},
    create: {
      name: faker.lorem.words(2),
      countryId: country.id,
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

  const currentTravel: Travel = await prisma.travel.upsert({
    where: {
      id: faker.datatype.number(),
    },
    update: {},
    create: {
      userId: user.id,
      destinationId: knownDestination.id,
      startDate: dayjs().subtract(1, "day").format(),
      endDate: dayjs().add(1, "day").format(),
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
    currentTravel,
    favorite,
    knownDestination,
    obtainedAchievement,
    achievement,
    achievementUser,
    country,
  };
}
