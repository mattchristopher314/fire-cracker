import { supabase } from "./supabase";

export async function getProfileSettings<T extends readonly string[]>(
  id: string | undefined,
  settingsToFetch: [...T]
): Promise<{ [Key in T[number]]: string | undefined }> {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("id", id || "")
    .in("type", settingsToFetch);

  if (error) {
    throw new Error("Settings could not be fetched");
  }

  return settingsToFetch.reduce((obj, key) => {
    return {
      ...obj,
      [key]: data.find((x) => x.type === key)?.payload || undefined,
    };
  }, {}) as { [Key in T[number]]: string | undefined };
}
