import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiProfile";
import { useUserData } from "../../context/useUserData";

export const useUpdateProfile = () => {
  const { user } = useUserData();
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (data) => {
      if (data) queryClient.setQueryData(["profile", user?.id], data);
    },
  });

  return updateProfileMutation;
};
