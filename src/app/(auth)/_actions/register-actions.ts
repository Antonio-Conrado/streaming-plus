"use server";

import z from "zod";
import { Register, registerSchema } from "../_interfaces/session";
import { supabase } from "@/lib/config/supabase";

type InitialState = {
  message: string;
  isSuccess: boolean;
  errors?: Record<string, { errors: string[] }>;
  values?: Register;
};

export async function register(state: InitialState, formData: FormData) {
  const data = {
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  const validatedFields = registerSchema.safeParse(data);

  if (!validatedFields.success) {
    const treeErrors = z.treeifyError(validatedFields.error);
    return {
      isSuccess: false,
      errors: treeErrors.properties,
      message: "Errores en validaciones",
      values: {
        name: data.name,
        email: data.email,
        password: "",
      },
    };
  }

  //register
  const { data: signUpData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
      },
    },
  });

  if (error) {
    return {
      isSuccess: false,
      message: "Hubo un error al registrarse. Intente nuevamente.",
      values: {
        name: data.name,
        email: data.email,
        password: "",
      },
    };
  }

  if (signUpData.user) {
    const { error: insertError } = await supabase
      .from("users")
      .insert([
        { user_id: signUpData.user.id, name: data.name, email: data.email },
      ]);

    if (insertError && insertError.code === "23505") {
      return {
        isSuccess: false,
        message: "El correo eléctronico ya existe!",
      };
    }

    if (insertError) {
      await supabase.auth.admin.deleteUser(signUpData.user.id);

      return {
        isSuccess: false,
        message: "Hubo un error al registrar el usuario. Intente nuevamente",
      };
    }
  }

  return {
    isSuccess: true,
    message:
      "Registro de sesión correcto. Verifique su email para confirmar su cuenta.",
  };
}
