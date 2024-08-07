import { User, Session } from "@supabase/supabase-js";
import { LoginProps } from "../features/authentication/useLogin";
import { Database, supabase } from "./supabase";
import { SignupProps } from "../features/authentication/useSignup";
import { BASE_URL } from "../utils/constants";

export interface UserData {
  user: User | null;
  session: Session | null;
}

const testerAccountUUID =
  import.meta.env.VITE_TESTER_ACCOUNT_UUID ||
  process.env.VITE_TESTER_ACCOUNT_UUID ||
  "";

export const login = async ({
  email,
  password,
}: LoginProps): Promise<{ user: User; session: Session }> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email || "",
    password: password || "",
  });

  if (error) throw new Error(error.message);

  return data;
};

export const signup = async ({
  email,
  firstName,
  lastName,
  password,
}: SignupProps): Promise<{
  user: User | null;
  session: Session | null;
} | null> => {
  if (!email || !firstName || !lastName || !password) return null;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name_at_signup: firstName,
        last_name_at_signup: lastName,
      },
      emailRedirectTo: `${BASE_URL}/app?success=verified`,
    },
  });

  if (error) throw new Error(error.message);

  return data;
};

export const getCurrentUser = async (): Promise<User | null> => {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
};

export const deleteCurrentUser = async (
  confirmAddress: string
): Promise<Database["public"]["Tables"]["profiles"]["Row"] | null> => {
  const user = await getCurrentUser();

  if (!user || confirmAddress !== user.email) {
    throw new Error("Could not validate email");
  }

  if (user.id === testerAccountUUID)
    throw new Error("Permissions on the tester account are restricted.");

  const { data: existingContentList, error: existingContentError } =
    await supabase.storage.from("avatars").list(`${user.id}`);
  const { error: removeError } = await supabase.storage
    .from("avatars")
    .remove(existingContentList?.map((x) => `${user.id}/${x.name}`) || []);

  const { data, error: userDeleteError } = await supabase
    .from("profiles")
    .delete()
    .eq("id", user?.id || "")
    .select()
    .single();

  if (existingContentError) throw new Error(existingContentError.message);
  if (removeError) throw new Error(removeError.message);
  if (userDeleteError) throw new Error(userDeleteError.message);

  logout();

  return data;
};

export const logout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};
