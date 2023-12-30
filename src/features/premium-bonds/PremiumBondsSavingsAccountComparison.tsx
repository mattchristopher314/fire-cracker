import styled from "styled-components";
import Tooltip from "../../ui/Tooltip";
import { useTaxableEquivalentAmount } from "../../utils";

const StyltedPremiumBondsSavingsAccountComparison = styled.div`
  font-size: 1.4rem;
`;

const PremiumBondsSavingsAccountComparison: React.FC<{
  holding: number;
  medianAnnualReturn: number;
}> = ({ holding, medianAnnualReturn }) => {
  const untaxedRate = holding === 0 ? 0 : (medianAnnualReturn / holding) * 100;
  const { isLoading, data: taxableEquivalentAmount } =
    useTaxableEquivalentAmount(medianAnnualReturn);
  const taxableEquivalentRate =
    holding === 0
      ? 0
      : ((isLoading ? 0 : Number(taxableEquivalentAmount)) / holding) * 100;

  return (
    <StyltedPremiumBondsSavingsAccountComparison>
      <p>Median interest rate: {untaxedRate.toPrecision(3)}%</p>
      <Tooltip>
        <Tooltip.Main>
          Tax-adjusted rate (AER):{" "}
          {isLoading
            ? taxableEquivalentRate
            : taxableEquivalentRate.toPrecision(3)}
          %
        </Tooltip.Main>
        <Tooltip.Info>
          This is the rate that a taxable savings account would need to be to
          match the interest generated on your median annual winnings.
        </Tooltip.Info>
      </Tooltip>
    </StyltedPremiumBondsSavingsAccountComparison>
  );
};

export default PremiumBondsSavingsAccountComparison;
