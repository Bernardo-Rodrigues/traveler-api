import { User } from ".prisma/client";
import { prisma } from "../database.js";

export type UserInsertData = Omit<User, "id">;

async function create(userId: string) {
  const createdUser = await prisma.user.create({
    data: {
      id: userId,
    },
  });

  return createdUser;
}

async function remove(userId: string) {
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
}

async function findById(id: string) {
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
  remove,
  create,
  findById,
  truncate,
};
