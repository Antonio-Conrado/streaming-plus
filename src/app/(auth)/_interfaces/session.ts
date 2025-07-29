import { z } from "zod";

// login

export const loginSchema = z.object({
  email: z.email({ message: "El correo electrónico debe ser válido" }),
  password: z.string(),
});
export type Login = z.infer<typeof loginSchema>;

//register
export const registerSchema = z.object({
  name: z.string(),
  email: z.email({ message: "El correo electrónico debe ser válido" }),
  password: z
    .string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
      message: "La contraseña debe contener letras y números",
    })
    .min(6, { message: "La contraseña debe tener mínimo 6 caracteres" }),
});

export type Register = z.infer<typeof registerSchema>;
