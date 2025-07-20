import bcrypt from "bcrypt";
import { prisma } from "../../../config";

export interface IUpdateUserData {
  id: number;
  newNameUser?: string;
  newEmail?: string;
  newPassword?: string;
}

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
