import { supabase } from "./supabase";

export enum PossibleStats {
  PB = "nsi_PB",
  TAX = "uk_TAX",
}

export async function getStats<T>(type: PossibleStats) {
  const { data, error } = await supabase
    .from("global-stats")
    .select("data")
    .eq("parent", type)
    .single();

  if (error || !data.data) {
    if (error) {
      console.error(error);
    }

    throw new Error(`${type} stats could not be fetched`);
  }

  return data.data as T;
}
