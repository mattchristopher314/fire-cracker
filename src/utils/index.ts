import { useQuery } from "@tanstack/react-query";
import { PossibleStats, getStats } from "../services/apiStats";
import { TaxJSONData } from "../services/supabase";

export const useTaxBand = (
  income: number
): { isLoading: boolean; data: number | "Loading..." } => {
  const { isLoading, data } = useQuery({
    queryKey: ["stats", PossibleStats.TAX],
    queryFn: () => getStats<TaxJSONData>(PossibleStats.TAX),
  });

  if (isLoading) return { isLoading: true, data: "Loading..." };

  return {
    isLoading: false,
    data:
      data?.data.rates
        .filter(
          (rate) =>
            (rate.bandLower || 0) <= income &&
            income < (rate.bandUpper || Infinity)
        )
        .map((rate) => rate.rate)[0] || 0,
  };
};
