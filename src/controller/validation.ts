import { z } from "zod";

// 📝 Schema para registrar usuário
export const registerUserSchema = z
  .object({
    nameUser: z
      .string()
      .min(3, "Nome deve ter pelo menos 3 caracteres")
      .max(50, "Nome deve ter no máximo 50 caracteres")
      .trim()
      .refine(
        (val) => /^[\p{L}\p{M}\p{N}_\s]+$/u.test(val),
        "Nome só pode conter letras, números, _ e espaços"
      ),

    email: z.string().email("Email deve ter formato válido").toLowerCase(),

    password: z
      .string()
      .min(6, "Senha deve ter pelo menos 6 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Senha deve ter pelo menos: 1 letra minúscula, 1 maiúscula e 1 número"
      ),

    confirmPassword: z.string().min(6, "Confirmação de senha é obrigatória"),
  })
  .refine(
    data => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Senhas não coincidem",
      path: ["confirmPassword"],
    }
  );

// 📊 Type automático
export type RegisterUserInput = z.infer<typeof registerUserSchema>;
