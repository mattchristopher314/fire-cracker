import { User, Session } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { UserData, login as loginApi } from "../../services/apiAuth";

export interface LoginProps {
  email: string | undefined;
  password: string | undefined;
}

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading: isLoggingIn } = useMutation<
    UserData,
    unknown,
    LoginProps,
    unknown
  >({
    mutationFn: ({
      email,
      password,
    }: LoginProps): Promise<{
      user: User;
      session: Session;
    }> => loginApi({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    },
  });

  return { login, isLoggingIn };
};
