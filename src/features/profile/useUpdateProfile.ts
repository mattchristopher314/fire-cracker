import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiProfile";
import { useUser } from "../authentication/useUser";
import toast from "react-hot-toast";

export const useUpdateProfile = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { mutate: updateProfile, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["profile", user?.id], data);
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    },
  });

  return { updateProfile, isUpdating };
};
