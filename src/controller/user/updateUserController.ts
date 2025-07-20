import { Request, Response, RequestHandler } from "express";
import { updateUserControllerSchema } from "../../validates/loginUserValidade";
import { updateUsers } from "../../models/user/updateUserModel";

export const updateUserController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const validateResult = updateUserControllerSchema.safeParse(req.body);

    if (!validateResult.success) {
      res.status(400).json({
        errors: validateResult.error.errors.map(err => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
      return;
    }

    const { id, newEmail, newNameUser, newPassword } = validateResult.data;

    const updatedUser = await updateUsers({
      id,
      newEmail: newEmail ? newEmail.toLowerCase() : undefined,
      newNameUser,
      newPassword,
    });

    if (!updatedUser) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
  }
};
