import { useMutation } from "@tanstack/react-query";
import { UserData, signup as signupApi } from "../../services/apiAuth";
import { Session, User } from "@supabase/supabase-js";
import toast from "react-hot-toast";

export interface SignupProps {
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  password: string | undefined;
}

export const useSignup = () => {
  const { mutate: signup, isLoading: isSigningUp } = useMutation<
    UserData | null,
    unknown,
    SignupProps,
    unknown
  >({
    mutationFn: ({
      email,
      firstName,
      lastName,
      password,
    }: SignupProps): Promise<{
      user: User | null;
      session: Session | null;
    } | null> => signupApi({ email, firstName, lastName, password }),
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(`Something went wrong: ${err.message}`);
      }
    },
  });

  return { signup, isSigningUp };
};
