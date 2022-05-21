import { User } from ".prisma/client";
import { prisma } from "../database.js";

export type UserInsertData = Omit<User, "id">;

async function create(user: UserInsertData) {
  console.log(user);
  const createdUser = await prisma.user.create({
    data: user,
  });

  return createdUser;
}

async function findByEmail(email: string) {
  const user = await prisma.user.findUnique({
    include: {
      avatar: {
        select: {
          imageLink: true,
        },
      },
    },
    where: {
      email,
    },
  });

  return user;
}

async function findByName(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  return user;
}

async function findById(id: number) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}

async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
}

export default {
  create,
  findByEmail,
  findByName,
  findById,
  truncate,
};
