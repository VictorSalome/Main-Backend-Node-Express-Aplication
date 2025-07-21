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

    return res.status(201).json(newStudent);
  } catch (error) {
    console.log("erroczxczxczxr", error);

    if (
      error instanceof Error &&
      error.message === "Estudante com este CPF já existe"
    ) {
      return res.status(409).json({ error: error.message });
    }

    return res.status(500).json(error);
  }
};
