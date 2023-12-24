export type EstimatedReturn = {
  value: string;
  probability: number;
  color: string;
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
