import { prisma } from "../database.js";

async function list(count: number) {
  return await prisma.title.findMany({
    where: {
      OR: [
        {
          count: {
            equals: null,
          },
        },
        {
          count: {
            lte: count,
          },
        },
      ],
    },
  });
}

async function findByText(text: string) {
  return await prisma.title.findUnique({
    where: {
      text,
    },
  });
}

async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE titles CASCADE`;
}

export default { list, truncate, findByText };
