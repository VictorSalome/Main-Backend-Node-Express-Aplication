import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;
