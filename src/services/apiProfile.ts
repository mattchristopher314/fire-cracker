import { getCurrentUser } from "./apiAuth";
import { Database, supabase } from "./supabase";

export async function getProfile(id: string | undefined) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id || "")
    .single();

  if (error) {
    throw new Error("Profile could not be loaded");
  }

  return data;
}

export const updateCurrentUser = async ({
  firstName,
  lastName,
  avatar,
}: {
  firstName: string | undefined;
  lastName: string | undefined;
  avatar: File | undefined;
}): Promise<Database["public"]["Tables"]["profiles"]["Row"] | null> => {
  const user = await getCurrentUser();

  if (!user) throw new Error("Failed to fetch active user to update.");

  const avatarPath = avatar
    ? `/${user.id}/av-${Date.now() + Math.random()}`
    : undefined;

  const { data, error } = await supabase
    .from("profiles")
    .update({
      first_name: firstName,
      last_name: lastName,
      avatar: avatarPath,
    })
    .eq("id", user.id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  if (avatar && avatarPath) {
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(avatarPath, avatar);

    if (uploadError) throw new Error(uploadError.message);
  }

  return data;
};
