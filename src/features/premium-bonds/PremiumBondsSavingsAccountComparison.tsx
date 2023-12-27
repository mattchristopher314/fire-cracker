import styled from "styled-components";
import Tooltip from "../../ui/Tooltip";

const StyltedPremiumBondsSavingsAccountComparison = styled.div`
  font-size: 1.4rem;
`;

const PremiumBondsSavingsAccountComparison: React.FC<{
  holding: number;
  medianAnnualReturn: number;
}> = ({ holding, medianAnnualReturn }) => {
  return (
    <StyltedPremiumBondsSavingsAccountComparison>
      Median interest rate:{" "}
      {holding === 0
        ? 0
        : ((medianAnnualReturn / holding) * 100).toPrecision(3)}
      %
      <Tooltip>
        <Tooltip.Main>Tax-adjusted rate (AER): 4.5%</Tooltip.Main>
        <Tooltip.Info>
          This is the rate that a taxable savings account would need to be to
          match the interest generated on your median annual winnings.
        </Tooltip.Info>
      </Tooltip>
    </StyltedPremiumBondsSavingsAccountComparison>
  );
};

export default PremiumBondsSavingsAccountComparison;
