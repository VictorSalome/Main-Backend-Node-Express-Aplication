import z from "zod";

export const deactivateUserSchema = z.object({
  userId: z.number().int().positive(),
});
