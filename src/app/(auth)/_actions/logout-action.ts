"use server";

import { cookies } from "next/headers";
import { supabase } from "@/lib/config/supabase";
import { redirect } from "next/navigation";

type InitialState = {
  message: string;
  isSuccess: boolean;
};
export async function logout(state: InitialState) {
  await supabase.auth.signOut();

  const cookieStore = await cookies();
  cookieStore.delete("streaming-token");
  cookieStore.delete("streaming-user");
  redirect("/");
  return {
    message: "sesión cerrada correctamente",
    isSuccess: true,
  };
}
