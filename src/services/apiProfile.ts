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
  password,
}: {
  firstName: string | undefined;
  lastName: string | undefined;
  avatar: File | undefined;
  password: string | undefined;
}): Promise<Database["public"]["Tables"]["profiles"]["Row"] | null> => {
  const user = await getCurrentUser();

  if (!user) throw new Error("Failed to fetch active user to update.");

  const avatarPath = avatar
    ? `/${user.id}/av-${Date.now() + Math.random()}`
    : undefined;

  if (password) {
    const { error: updatePasswordError } = await supabase.auth.updateUser({
      password: password,
    });

    if (updatePasswordError) throw new Error(updatePasswordError.message);
  }

  if (firstName || lastName || avatar) {
    const { data, error } = await supabase
      .from("profiles")
      .update({
        first_name: firstName || undefined,
        last_name: lastName || undefined,
        avatar: avatarPath || undefined,
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
  }

  if (password) return null;

  throw new Error("Nothing to update!");
};
