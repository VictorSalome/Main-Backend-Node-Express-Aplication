import { Request, Response, RequestHandler } from "express";
import { activateUserSchema } from "../../validates/activateUserValidate";
import { activateUser } from "../../models/user/activateUserModel";

export const activateUserController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const validateResult = activateUserSchema.safeParse(req.body);
    if (!validateResult.success) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: validateResult.error.errors,
      });
    }
    const { userId } = validateResult.data;

    const user = await activateUser(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json({
      message: "Usuário ativado com sucesso",
      data: user,
    });
  } catch (error) {
    console.error("Erro ao ativar usuário:", error);
    res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
};
