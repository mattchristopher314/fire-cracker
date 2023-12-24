import { PBJSONData } from "../../../services/supabase";
import { EstimatedReturn } from "../calculatePremiumBondStats";

self.onmessage = async (message) => {
  const EstimateReturns: (
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

    const MAX_PRIZE = (((4000 * (holding || 0)) / 50000) * months) / 12 + 500;
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

  const { holding, data, colours, months } = message.data;
  const result = EstimateReturns(holding, data, colours, months);

  self.postMessage(result);
};
