import { useQuery } from "@tanstack/react-query";
import { getHolding } from "../services/apiHolding";
import { useUserData } from "../context/useUserData";

export function useHolding(vehicle: string) {
  const { user } = useUserData();

  const { isLoading, data: holding } = useQuery({
    queryFn: () => getHolding(vehicle),
    queryKey: ["holding", user?.id, vehicle],
  });

  return { isLoading, holding };
}
