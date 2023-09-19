import { useQuery } from "@tanstack/react-query";
import { PossibleStats, getStats } from "../services/apiStats";
import { PBJSONData } from "../services/supabase";

export const usePremiumBondsStats = () => {
  const { isLoading, data: stats } = useQuery({
    queryKey: ["stats", PossibleStats.PB],
    queryFn: () => getStats<PBJSONData>(PossibleStats.PB),
  });

  return { isLoading, stats };
};
