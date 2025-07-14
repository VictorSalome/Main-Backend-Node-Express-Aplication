import { Request, Response, RequestHandler } from "express";
import { loginUser } from "../../models/auth/loginUserModel";
import { loginUserSchema } from "../../validates/loginUser.validade";

export const postLoginUserController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const validationResult = loginUserSchema.safeParse(req.body);

    if (!validationResult.success) {
      res.status(400).json({
        errors: validationResult.error.errors.map(err => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
      return;
    }

    const { email, password } = validationResult.data;

    const result = await loginUser({ email, password });

    res.status(200).json({
      success: true,
      data: result,
    });
    return;
  } catch (error) {
    console.error("=== ERRO NO CONTROLLER ===");
    console.error("Erro:", error);

    if (error instanceof Error) {
      console.error("Mensagem:", error.message);

      if (error.message === "Usuário não encontrado") {
        res.status(404).json({
          error: "Senha ou email incorreta. Verifique e tente novamente.",
        });
        return;
      }

      if (error.message === "Senha inválida") {
        res.status(401).json({
          error: "Senha ou email incorreta. Verifique e tente novamente.",
        });
        return;
      }
    }

    res.status(500).json({
      error: "Erro interno do servidor. Tente novamente mais tarde.",
    });
    return;
  }
};
