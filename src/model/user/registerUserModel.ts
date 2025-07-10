import bcrypt from "bcrypt";
import { prisma } from "../../config";

export interface CreateUserData {
  nameUser: string;
  email: string;
  password: string;
}

export const createUser = async (userData: CreateUserData) => {
  const { nameUser, email, password } = userData;

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
    },
    select: {
      id: true,
      nameUser: true,
      email: true,
      createdAt: true,
    },
  });

  return newUser;
};

export const getListOfUsers = async () => {
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
