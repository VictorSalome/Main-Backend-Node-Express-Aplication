import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export const updateUserControllerSchema = z.object({
  id: z.number().int("ID deve ser um número inteiro"),
  newEmail: z.string().email("Email inválido").optional(),
  newNameUser: z
    .string()
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .optional(),
  newPassword: z
    .string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .optional(),
});

export const authenticateUpdateUserSchema = z.object({
  jwt: z.string().min(1, "Token JWT é obrigatório"),
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type UpdateUserControllerInput = z.infer<
  typeof updateUserControllerSchema
>;
