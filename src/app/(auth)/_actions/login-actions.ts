"use server";

import z from "zod";
import { Login, loginSchema } from "../_interfaces/session";
import { supabase } from "@/lib/config/supabase";
import { cookies } from "next/headers";

type InitialState = {
  message: string;
  isSuccess: boolean;
  userId: string | null;
  errors?: Record<string, { errors: string[] }>;
  values?: Login;
};

export async function login(state: InitialState, formData: FormData) {
  const fields = {
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  const validatedFields = loginSchema.safeParse(fields);

  if (!validatedFields.success) {
    const treeErrors = z.treeifyError(validatedFields.error);
    return {
      userId: null,
      isSuccess: false,
      errors: treeErrors.properties,
      message: "Error en validación",
      values: {
        email: fields.email,
        password: "",
      },
    };
  }

  //authentication
  const { data, error } = await supabase.auth.signInWithPassword({
    email: fields.email,
    password: fields.password,
  });

  if (error) {
    return {
      userId: null,
      isSuccess: false,
      message: "Crendeciales inválidas. Intente nuevamente.",
      values: {
        email: fields.email,
        password: "",
      },
    };
  }

  (await cookies()).set("streaming-token", data.session.access_token, {
    httpOnly: true,
    expires: new Date(data.session.expires_at! * 1000),
  });

  const user = {
    id: data.user.user_metadata.sub,
    name: data.user.user_metadata.name,
  };

  (await cookies()).set("streaming-user", JSON.stringify(user), {
    httpOnly: true,
    expires: new Date(data.session.expires_at! * 1000),
  });

  return {
    userId: data.user.id,
    isSuccess: true,
    message: "Inicio de sesión exitoso",
  };
}
