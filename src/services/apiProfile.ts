import { getCurrentUser } from "./apiAuth";
import { Database, supabase } from "./supabase";

const testerAccountUUID =
  import.meta.env.VITE_TESTER_ACCOUNT_UUID ||
  process.env.VITE_TESTER_ACCOUNT_UUID ||
  "";

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

  if (!user) throw new Error("Failed to fetch active user to update");

  const avatarPath = avatar
    ? `/${user.id}/av-${Date.now() + Math.random()}`
    : undefined;

  if (password) {
    const { error: updatePasswordError } = await supabase.auth.updateUser({
      password: password,
    });

    if (user.id === testerAccountUUID && updatePasswordError)
      throw new Error("Permissions on the tester account are restricted.");
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

    if (user.id === testerAccountUUID && error)
      throw new Error("Permissions on the tester account are restricted.");
    if (error) throw new Error(error.message);

    if (avatar && avatarPath) {
      const { data: existingContentList, error: existingContentError } =
        await supabase.storage.from("avatars").list(`${user.id}`);
      const { error: removeError } = await supabase.storage
        .from("avatars")
        .remove(existingContentList?.map((x) => `${user.id}/${x.name}`) || []);
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(avatarPath, avatar);

      if (existingContentError) throw new Error(existingContentError.message);

      if (user.id === testerAccountUUID && removeError)
        throw new Error("Permissions on the tester account are restricted.");
      if (removeError) throw new Error(removeError.message);

      if (user.id === testerAccountUUID && uploadError)
        throw new Error("Permissions on the tester account are restricted.");
      if (uploadError) throw new Error(uploadError.message);
    }

    return data;
  }

  if (password) return null;

  throw new Error("Nothing to update!");
};
