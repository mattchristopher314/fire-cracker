import { useQuery } from "@tanstack/react-query";
import { useUser } from "../features/authentication/useUser";
import { getHolding } from "../services/apiHolding";

export function useHolding(vehicle: string) {
  const { user } = useUser();

  const { isLoading, data: holding } = useQuery({
    queryKey: ["holding", user?.id, vehicle],
    queryFn: () => getHolding(user?.id, vehicle),
  });

  return { isLoading, holding };
}
