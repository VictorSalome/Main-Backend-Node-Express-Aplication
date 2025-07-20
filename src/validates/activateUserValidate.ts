import z from "zod";

export const activateUserSchema = z.object({
  userId: z.number().int().positive(),
});
