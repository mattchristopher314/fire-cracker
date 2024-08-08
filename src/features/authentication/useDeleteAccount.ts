import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCurrentUser } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteAccountMutation = useMutation({
    mutationFn: deleteCurrentUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/", { replace: true });
    },
  });

  return deleteAccountMutation;
};
