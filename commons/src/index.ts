import { z } from "zod";
export const SignInParams = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignInType = z.infer<typeof SignInParams>;
