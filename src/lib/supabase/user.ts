import { supabase } from "@/lib/config/supabase";

export async function getUserNameById(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .select("id,name")
    .eq("user_id", userId)
    .single();
  if (error) return null;
  return { id: data.id, name: data.name };
}
