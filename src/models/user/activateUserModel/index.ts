import { prisma } from "../../../config";

export const activateUser = async (userId: number) => {
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    return null;
  }

  const activateUser = await prisma.user.update({
    where: { id: userId },
    data: { isActive: true },
    select: {
      id: true,
      nameUser: true,
      email: true,
      isActive: true,
    },
  });

  return activateUser;
};
