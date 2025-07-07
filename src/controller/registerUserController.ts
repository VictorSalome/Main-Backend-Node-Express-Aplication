import { Request, Response, RequestHandler } from "express";
import { registerUserSchema } from "./validation";
import { createUser } from "../model/registerUserModel";

export const postRegisterUserController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    // 🔍 Validar dados com Zod
    const validationResult = registerUserSchema.safeParse(req.body);

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => ({
        field: err.path.join("."),
        message: err.message,
      }));

      res.status(400).json({
        success: false,
        message: "❗ Dados inválidos",
        errors: errors,
      });
      return;
    }

    // ✅ Dados validados
    const { nameUser, email, password } = validationResult.data;

    // 📝 Chamar o Model para criar usuário
    const newUser = await createUser({
      nameUser,
      email: email.toLowerCase(),
      password,
    });

    // ✅ Sucesso
    res.status(201).json({
      success: true,
      message: "✅ Usuário registrado com sucesso",
      data: newUser,
    });
  } catch (error) {
    console.error("❌ Erro ao registrar usuário:", error);

    // Tratamento específico para diferentes tipos de erro
    if (error instanceof Error) {
      // Erro de email já existente
      if (error.message === "Email já está em uso") {
        res.status(422).json({
          success: false,
          message: "❗ Dados não processáveis",
          errors: [
            {
              field: "email",
              message: "Este email já está sendo usado por outro usuário",
            },
          ],
        });
        return;
      }

      // Erro de validação do Prisma (unique constraint)
      if (error.message.includes("Unique constraint failed")) {
        res.status(409).json({
          success: false,
          message: "❗ Dados já estão em uso",
          errors: [
            {
              field: "email",
              message: "Email ou nome de usuário já estão sendo usados",
            },
          ],
        });
        return;
      }
    }

    // Erro genérico do servidor
    res.status(500).json({
      success: false,
      message: "❗ Erro interno do servidor",
    });
  }
};
