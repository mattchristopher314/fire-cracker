import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiProfile";
import { useUser } from "../authentication/useUser";

export const useUpdateProfile = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["profile", user?.id], data);
    },
  });

  return updateProfileMutation;
};
