import { prisma } from "../../../config";

export const listUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      nameUser: true,
      email: true,
      createdAt: true,
    },
  });

  return users;
};
