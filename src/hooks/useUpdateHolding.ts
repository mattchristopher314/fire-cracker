import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../features/authentication/useUser";
import { updateHolding } from "../services/apiHolding";

export function useUpdateHolding(vehicle: string) {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const updateHoldingMutation = useMutation({
    mutationFn: updateHolding,
    onSuccess: (data) => {
      if (data) queryClient.setQueryData(["holding", user?.id, vehicle], data);
    },
  });

  return updateHoldingMutation;
}
