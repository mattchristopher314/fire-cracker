import { PBJSONData } from "../../services/supabase";

export type EstimatedReturn = {
  value: string;
  probability: number;
  color: string;
};

export const EstimateReturns: (
  data: PBJSONData,
  colors: Array<string>
) => Array<EstimatedReturn> = (data, colors) => {
  const allocations = [...data.prizeAllocations];
  allocations.sort((a, b) => a.value - b.value);
  const totalPrizes = data.prizeAllocations.reduce(
    (cur, obj) => cur + obj.number,
    0
  );

  return allocations.map((obj, i) => {
    return {
      value: obj.value.toString(),
      probability: obj.number / totalPrizes,
      color: colors && colors[i % colors.length],
    } as EstimatedReturn;
  });
};
