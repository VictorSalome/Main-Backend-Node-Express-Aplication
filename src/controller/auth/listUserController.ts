import { Request, Response, RequestHandler } from "express";

import { getListUsers } from "../../models/auth/users";

export const getListUserController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await getListUsers();
    res.status(200).json({
      message: "Lista de usuários",
      data: users,
    });
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
};
