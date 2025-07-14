import { Request, Response, RequestHandler } from "express";

import { createUser } from "../../models/auth/registerUserModel";
import { registerUserSchema } from "../../validates/registerUser.validate";

export const postRegisterUserController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const validationResult = registerUserSchema.safeParse(req.body);

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => ({
        field: err.path.join("."),
        message: err.message,
      }));

      res.status(400).json({
        errors: errors,
      });
      return;
    }

    const { nameUser, email, password } = validationResult.data;

    const newUser = await createUser({
      nameUser,
      email: email.toLowerCase(),
      password,
    });

    res.status(201).json({
      message: "Usuário registrado com sucesso",
      data: newUser,
    });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);

    if (error instanceof Error) {
      if (error.message === "Email já está em uso") {
        res.status(422).json({
          message: "Dados não processáveis",
          errors: [
            {
              field: "email",
              message: "Este email já está sendo usado por outro usuário",
            },
          ],
        });
        return;
      }

      if (error.message.includes("Unique constraint failed")) {
        res.status(409).json({
          message: " Dados já estão em uso",
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

    res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
};
