import { useQuery } from "@tanstack/react-query";
import { PossibleStats, getStats } from "../services/apiStats";
import { TaxJSONData } from "../services/supabase";
import { useProfileSettings } from "../features/profile/useProfileSettings";

export const useTaxBand = (
  income: number
): {
  isLoading: boolean;
  data: TaxJSONData["rates"][number] | undefined;
} => {
  const { isLoading, data } = useQuery({
    queryKey: ["stats", PossibleStats.TAX],
    queryFn: () => getStats<TaxJSONData>(PossibleStats.TAX),
  });

  if (isLoading) return { isLoading: true, data: undefined };

  return {
    isLoading: false,
    data: data?.data.rates.filter(
      (rate) =>
        (rate.bandLower || 0) <= (income || 0) &&
        (income || 0) <= (rate.bandUpper || Infinity)
    )?.[0],
  };
};

export const useTaxableEquivalentAmount = (
  untaxedAmount: number
): {
  isLoading: boolean;
  data: number | undefined;
  taxFreeSavingsAllowance: number | undefined;
} => {
  const { isLoading: isLoadingIncome, settings } = useProfileSettings([
    "income",
  ]);

  const { isLoading: isLoadingRates, data: rates } = useQuery({
    queryKey: ["stats", PossibleStats.TAX],
    queryFn: () => getStats<TaxJSONData>(PossibleStats.TAX),
  });

  const { isLoading: isLoadingTaxBand, data: taxBand } = useTaxBand(
    Number(settings?.income)
  );

  if (isLoadingIncome || isLoadingRates || isLoadingTaxBand)
    return {
      isLoading: true,
      data: undefined,
      taxFreeSavingsAllowance: undefined,
    };

  const taxFreeSavingsAllowance = Math.max(
    (taxBand as TaxJSONData["rates"][number])?.personalSavingsAllowance || 0,
    (rates?.data.rates[0].bandUpper || 0) +
      6000 -
      (Number(settings?.income) || 0)
  );

  const taxFree = Math.min(taxFreeSavingsAllowance, untaxedAmount);
  const taxRate = (taxBand as TaxJSONData["rates"][number])?.rate / 100;

  return {
    isLoading: false,
    data:
      taxFree +
      (untaxedAmount - taxFree) /
        (1 - (taxRate === 0 ? rates?.data.rates[0].rate ?? 0 : taxRate)),
    taxFreeSavingsAllowance,
  };
};
