import z from "zod";

export const registerStudentValidate = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string()
    .email("O email deve ter um formato válido")
    .toLowerCase(),
  CPF: z.string()
    .length(11, "O CPF deve ter exatamente 11 caracteres")
    .regex(/^\d{11}$/, "O CPF deve conter apenas números"),
})
