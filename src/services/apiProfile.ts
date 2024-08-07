import { PostgrestError } from "@supabase/supabase-js";
import { AVATAR_FILE_SIZE_LIMIT } from "../utils/constants";
import { getCurrentUser } from "./apiAuth";
import { supabase } from "./supabase";

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
}) => {
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
    let initialUpdateData: {
      avatar: string | null;
      created_at: string;
      first_name: string | null;
      id: string;
      last_name: string | null;
    } | null;
    let initialUpdateError: PostgrestError | null;

    if (firstName || lastName) {
      const { data: initialUpdateDataRes, error: initialUpdateErrorRes } =
        await supabase
          .from("profiles")
          .update({
            first_name: firstName || undefined,
            last_name: lastName || undefined,
          })
          .eq("id", user.id)
          .select()
          .single();
      initialUpdateData = initialUpdateDataRes;
      initialUpdateError = initialUpdateErrorRes;
    } else {
      const { data: initialUpdateDataRes, error: initialUpdateErrorRes } =
        await supabase.from("profiles").select("*").eq("id", user.id).single();
      initialUpdateData = initialUpdateDataRes;
      initialUpdateError = initialUpdateErrorRes;
    }

    if (user.id === testerAccountUUID && initialUpdateError)
      throw new Error("Permissions on the tester account are restricted.");
    if (initialUpdateError) throw new Error(initialUpdateError.message);

    if (avatar && avatarPath) {
      if (avatar.size > AVATAR_FILE_SIZE_LIMIT)
        throw new Error("Avatar file size is too big (limit 1MB)");

      const { data: existingContentList, error: existingContentError } =
        await supabase.storage.from("avatars").list(`${user.id}`);

      if (existingContentError) throw new Error(existingContentError.message);

      if (existingContentList && existingContentList.length > 0) {
        const { error: removeError } = await supabase.storage
          .from("avatars")
          .remove(
            existingContentList?.map((x) => `${user.id}/${x.name}`) || []
          );

        if (user.id === testerAccountUUID && removeError)
          throw new Error("Permissions on the tester account are restricted.");
        if (removeError) throw new Error(removeError.message);
      }

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(avatarPath, avatar);

      if (user.id === testerAccountUUID && uploadError)
        throw new Error("Permissions on the tester account are restricted.");
      if (uploadError) throw new Error(uploadError.message);

      const { data: postUpdateAvatarPathData, error: updateAvatarPathError } =
        await supabase
          .from("profiles")
          .update({
            avatar: avatarPath || undefined,
          })
          .eq("id", user.id)
          .select()
          .single();

      if (updateAvatarPathError) throw new Error(updateAvatarPathError.message);

      return { ...initialUpdateData, avatar: postUpdateAvatarPathData.avatar };
    }

    return initialUpdateData;
  }

  if (password) return null;

  throw new Error("Nothing to update!");
};
