import { User, Session } from "@supabase/supabase-js";
import { LoginProps } from "../features/authentication/useLogin";
import { supabase } from "./supabase";
import { SignupProps } from "../features/authentication/useSignup";

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

  const { data, error } = await supabase.auth.signUp({ email, password });

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

export const logout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};
