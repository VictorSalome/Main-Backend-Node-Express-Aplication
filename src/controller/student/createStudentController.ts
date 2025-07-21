import { Request, RequestHandler, Response } from "express";
import { createStudentModel } from "../../models/student/createStudentModels";
import { registerStudentValidate } from "../../validates/registerStudentValidate";

export const createStudentController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData = registerStudentValidate.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(400).json({ errors: validatedData.error.errors });
    }

    const { name, email, CPF } = validatedData.data;

    const newStudent = await createStudentModel({ name, email, CPF });

    if (!newStudent) {
      return res.status(500).json({ error: "Erro ao criar estudante" });
    }

    return res.status(201).json(newStudent);
  } catch (error) {
    console.error("Erro ao criar estudante:", error);
    return res.status(500).json({ error: "Erro ao criar estudante" });
  }
};
