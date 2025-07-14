import bcrypt from "bcrypt";
import { prisma } from "../../config";

export interface ICreateUserData {
  nameUser: string;
  email: string;
  password: string;
}

export interface IUpdateUserData {
  id: number;
  newNameUser?: string;
  newEmail?: string;
  newPassword?: string;
}

export const postCreateUser = async (userData: ICreateUserData) => {
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

export const getListUsers = async () => {
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

export const updateUsers = async (userUpdateData: IUpdateUserData) => {
  try {
    const { id, newEmail, newNameUser, newPassword } = userUpdateData;

    if (!id) {
      throw new Error("ID do usuário é obrigatório");
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(newNameUser && { nameUser: newNameUser }),
        ...(newEmail && { email: newEmail }),
        ...(newPassword && { password: await bcrypt.hash(newPassword, 10) }),
        updatedAt: new Date(),
      },
      select: {
        id: true,
        nameUser: true,
        email: true,
        updatedAt: true,
      },
    });

    if (!updatedUser) {
      throw new Error("Usuário não encontrado");
    }

    return {
      message: "Usuário atualizado com sucesso",
      data: updatedUser,
    };
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
  }
};
