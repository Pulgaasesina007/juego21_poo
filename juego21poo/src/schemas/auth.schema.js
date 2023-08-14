import { z } from "zod";

export const registerSchema = z.object({
  email: z.string({required_error: "Email is requerido",}).email({message: "Email no es valido",}),
  password: z.string({required_error: "Password is requerido",}).min(7,{message: "Password minimo 7 caracteres",}),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});