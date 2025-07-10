import bcrypt from "bcrypt";
import { prisma } from "../../config";
import { generateToken } from "../../utills/jwt";

interface ILoginUser {
  email: string;
  password: string;
}

export const loginUser = async ({ email, password }: ILoginUser) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        nameUser: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Senha inválida");
    }

    const token = generateToken(user.id);

    const result = {
      name: user.nameUser,
      email: user.email,
      token: token,
    };

    return result;
  } catch (error) {
    console.error("ERRO NO MODEL DE LOGIN:", error);
    console.error("Tipo do erro:", typeof error);
    console.error("É instância de Error:", error instanceof Error);
    if (error instanceof Error) {
      console.error("Mensagem do erro:", error.message);
    }
    throw error;
  }
};
