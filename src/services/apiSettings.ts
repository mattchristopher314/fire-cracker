import { getCurrentUser } from "./apiAuth";
import { Database, supabase } from "./supabase";

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

export const updateProfileSettings = async <T extends readonly string[]>({
  updates,
  settingsToUpdate,
}: {
  updates: { [Key in T[number]]: string | undefined };
  settingsToUpdate: [...T];
}): Promise<
  | {
      [Key in T[number]]:
        | Database["public"]["Tables"]["settings"]["Row"]
        | undefined;
    }
  | null
> => {
  const user = await getCurrentUser();

  if (!user) throw new Error("Failed to fetch active user to update");

  if (updates) {
    const { data, error } = await supabase
      .from("settings")
      .upsert(
        settingsToUpdate.map((el) => {
          return {
            id: user?.id,
            type: el,
            payload: updates[el] || "",
          };
        })
      )
      .eq("id", user.id)
      .select();

    if (error) throw new Error(error.message);

    return data.reduce((obj, item) => {
      return {
        ...obj,
        [item.type]: item,
      };
    }, {}) as {
      [Key in T[number]]:
        | Database["public"]["Tables"]["settings"]["Row"]
        | undefined;
    };
  }

  throw new Error("Nothing to update!");
};
