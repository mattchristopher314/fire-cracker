import { User, Session } from "@supabase/supabase-js";
import { LoginProps } from "../features/authentication/useLogin";
import { Database, supabase } from "./supabase";
import { SignupProps } from "../features/authentication/useSignup";
import { BASE_URL } from "../utils/constants";

export interface UserData {
  user: User | null;
  session: Session | null;
}

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
    throw new Error("Could not validate");
  }

  const { data, error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", user?.id || "")
    .select()
    .single();

  logout();

  if (error) throw new Error(error.message);

  return data;
};

export const logout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};
