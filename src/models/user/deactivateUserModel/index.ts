import { prisma } from "../../../config";

export const deactivateUser = async (userId: number) => {
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    return null;
  }

  const inactivateUser = await prisma.user.update({
    where: { id: userId },
    data: { isActive: false },
    select: {
      id: true,
      nameUser: true,
      email: true,
      isActive: true,
    },
  });

  return inactivateUser;
};
