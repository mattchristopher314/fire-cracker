import { Database, supabase } from "./supabase";

export async function getHolding(
  id: string | undefined,
  vehicle: string
): Promise<Database["public"]["Tables"]["holdings"]["Row"] | null> {
  const { data, error } = await supabase
    .from("holdings")
    .select("*")
    .eq("id", id || "")
    .eq("vehicle", vehicle);

  if (error) {
    throw new Error("Holdings could not be loaded");
  }

  if (data.length === 0) return null;

  return data[0];
}
