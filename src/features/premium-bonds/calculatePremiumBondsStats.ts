import { PBJSONData } from "../../services/supabase";

export type EstimatedReturn = {
  value: string;
  probability: number;
  color: string;
};

export const EstimateReturns: (
  holding: number | null,
  data: PBJSONData,
  colors: Array<string>,
  months?: number
) => Array<EstimatedReturn> = (
  holding,
  data,
  colors = ["slate"],
  months = 1
) => {
  const allocations = [...data.prizeAllocations];
  allocations.sort((a, b) => a.value - b.value);
  const totalPrizes = data.prizeAllocations.reduce(
    (cur, obj) => cur + obj.number,
    0
  );

  const winProb =
    1 - (1 - 1 / data.oddsReciprocal) ** ((holding || 0) * months);

  const MAX_PRIZE = (((4500 * (holding || 0)) / 50000) * months) / 12;
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
        (prize - x == 0
          ? Math.exp(-((holding || 0) * months) / data.oddsReciprocal)
          : probs.find((obj) => obj.value == prize - x)?.prob || 0);
    }

    curProb *= ((holding || 0) * months) / (data.oddsReciprocal * prize);
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

export const MedianReturn: (
  predictedReturns: Array<EstimatedReturn>
) => number = (predictedReturns) => {
  const medians: Array<number> = [];

  let prev = 0;
  let aft = predictedReturns.reduce((acc, cur) => acc + cur.probability, 0);

  predictedReturns.forEach((element) => {
    aft -= element.probability;
    if (prev < 0.5 && aft < 0.5) {
      medians.push(Number(element.value));
    }

    prev += element.probability;
  });

  return medians.reduce((acc, cur) => acc + cur, 0) / medians.length;
};
