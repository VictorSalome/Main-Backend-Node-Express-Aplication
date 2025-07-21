import { prisma } from "../../config";

interface ICreateStudent {
  name: string;
  email: string;
  CPF: string;
}

export const createStudentModel = (student: ICreateStudent) => {
  try {
    const { name, email, CPF } = student;


    const existingStudent = prisma.student.findUnique({
      where: { CPF },
    });

    if (!existingStudent) {
      throw new Error("Estudante com este RA já existe");
    }

    const generateRA = Math.floor(1000000 + Math.random() * 9000000).toString();

    const newStudent = prisma.student.create({
      data: {
        name,
        RA: generateRA,
        email,
        CPF,
      },
    });



    if (!newStudent) {
      throw new Error("Erro ao criar estudante");
    }

    return newStudent;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Mensagem do erro:", error.message);
    }
    throw error;
  }
};
