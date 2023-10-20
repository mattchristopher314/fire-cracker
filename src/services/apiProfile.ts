import { supabase } from "./supabase";

export async function getProfile(id: string | undefined) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id || "")
    .single();

  if (error) {
    console.error(error);
    throw new Error("Profile could not be loaded");
  }

  return data;
}
