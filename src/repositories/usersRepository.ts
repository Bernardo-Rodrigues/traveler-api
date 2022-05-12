import { User } from ".prisma/client";
import { prisma } from "../database.js";

export type UserInsertData = Omit<User, "id">;

async function create(user: UserInsertData) {
  const createdUser = await prisma.user.create({
    data: user,
  });

  return createdUser;
}

async function findByEmail(email: string) {
  const user = await prisma.user.findUnique({
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

export default {
  create,
  findByEmail,
  findByName,
};
