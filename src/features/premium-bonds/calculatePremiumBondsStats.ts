import { PBJSONData } from "../../services/supabase";

export type EstimatedReturn = {
  value: string;
  probability: number;
  color: string;
};

export const EstimateReturns: (
  holding: number | null,
  data: PBJSONData,
  colors: Array<string>
) => Array<EstimatedReturn> = (holding, data, colors) => {
  const allocations = [...data.prizeAllocations];
  allocations.sort((a, b) => a.value - b.value);
  const totalPrizes = data.prizeAllocations.reduce(
    (cur, obj) => cur + obj.number,
    0
  );

  const winProb = 1 - (1 - 1 / data.oddsReciprocal) ** (holding || 0);

  const MAX_PRIZE = 750;
  const PRIZE_INTERVAL = 25;

  let prize = 25;
  const probs: Array<{ value: number; prob: number }> = [];
  while (prize <= MAX_PRIZE) {
    let curProb = 0;

    for (let x = 25; x <= prize; x += PRIZE_INTERVAL) {
      curProb +=
        ((x *
          (data.prizeAllocations.find((obj) => (obj?.value || 0) == x)
            ?.number || 0)) /
          totalPrizes) *
        (prize == x
          ? Math.exp(-(holding || 0) / data.oddsReciprocal)
          : probs.find((obj) => obj.value == prize - x)?.prob || 0);
    }

    curProb *= (holding || 0) / (data.oddsReciprocal * prize);
    probs.push({ value: prize, prob: curProb });
    prize += PRIZE_INTERVAL;
  }

  return [
    {
      value: "0",
      probability: 1 - winProb,
      color: "slate",
    } as EstimatedReturn,
    ...probs.map((obj, i) => {
      return {
        value: obj.value.toString(),
        probability: obj.prob,
        color: colors && colors[i % colors.length],
      } as EstimatedReturn;
    }),
  ];
};
