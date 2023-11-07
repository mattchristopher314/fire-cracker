import { getCurrentUser } from "./apiAuth";
import { Database, Json, supabase } from "./supabase";

export async function getHolding(
  vehicle: string
): Promise<Database["public"]["Tables"]["holdings"]["Row"] | null> {
  const user = await getCurrentUser();

  if (!user) throw new Error("Failed to fetch active user");

  const { data, error } = await supabase
    .from("holdings")
    .select("*")
    .eq("id", user?.id || "")
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
    .upsert({ id: user?.id || "", vehicle, description, quantity, data })
    .eq("id", user?.id || "")
    .eq("vehicle", vehicle)
    .select();

  if (error) {
    throw new Error("Holding could not be updated");
  }

  if (result.length === 0) return null;

  return result[0];
}
