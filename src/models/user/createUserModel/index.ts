import { prisma } from "../../../config";
import bcrypt from "bcrypt";

export interface ICreateUserData {
  nameUser: string;
  email: string;
  password: string;
  isActive: boolean;
}

export const createUser = async (userData: ICreateUserData) => {
  const { nameUser, email, password, isActive } = userData;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email já está em uso");
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await prisma.user.create({
    data: {
      nameUser,
      email,
      password: hashedPassword,
      isActive,
    },
    select: {
      id: true,
      nameUser: true,
      email: true,
      isActive: true,
      createdAt: true,
    },
  });

  if (!newUser) {
    throw new Error("Erro ao criar usuário");
  }

  return newUser;
};
