import { getCurrentUser } from "./apiAuth";
import { Database, Json, supabase } from "./supabase";

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
    throw new Error("Holding could not be loaded");
  }

  if (data.length === 0) return null;

  return data[0];
}

export async function updateHolding({
  vehicle,
  description,
  quantity,
  data,
}: {
  vehicle: string;
  description?: string | undefined;
  quantity?: number | undefined;
  data?: Json | undefined;
}): Promise<Database["public"]["Tables"]["holdings"]["Row"] | null> {
  const user = await getCurrentUser();

  const { data: result, error } = await supabase
    .from("holdings")
    .update({ description, quantity, data })
    .eq("id", user?.id || "")
    .eq("vehicle", vehicle)
    .select();

  if (error) {
    throw new Error("Holding could not be updated");
  }

  if (result.length === 0) return null;

  return result[0];
}
