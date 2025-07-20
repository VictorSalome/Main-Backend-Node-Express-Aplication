import { Request, Response, RequestHandler } from "express";
import { deactivateUserSchema } from "../../validates/deactivateUserValidate";
import { deactivateUser } from "../../models/user/deactivateUserModel";

export const deactivateUserController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const validateResult = deactivateUserSchema.safeParse(req.body);

    if (!validateResult.success) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: validateResult.error.errors,
      });
    }
    const { userId } = validateResult.data;

    const user = await deactivateUser(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json({
      message: "Usuário desativado com sucesso",
      data: user,
    });
  } catch (error) {
    console.error("Erro ao desativar usuário:", error);
    res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
};
