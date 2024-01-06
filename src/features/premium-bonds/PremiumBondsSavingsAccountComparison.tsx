import styled from "styled-components";
import Tooltip from "../../ui/Tooltip";
import { useTaxableEquivalentAmount } from "../../utils";

const StyltedPremiumBondsSavingsAccountComparison = styled.div`
  font-size: 1.6rem;
  /* margin-top: 2rem; */

  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);

  & > :not(:last-child) {
    border-bottom: 1px solid var(--color-slate-200);
  }

  & > :not(:first-child) > :not(span) {
    margin-top: 1.2rem;
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    padding: 0 1.6rem 0 1.6rem;
  }

  & > * > span {
    color: var(--color-blue-600);
    display: block;
    font-weight: 500;
    font-size: 3.9rem;
    width: 100%;
    text-align: center;
    margin: 2rem 0;
  }
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
      <div>
        <p>Median interest rate:</p>
        <span>{untaxedRate.toPrecision(3)}%</span>
      </div>

      <div>
        <Tooltip>
          <Tooltip.Main>Tax-adjusted rate (AER):</Tooltip.Main>
          <Tooltip.Info>
            This is the rate that a taxable savings account would need to be to
            match the interest generated on your median annual winnings.
          </Tooltip.Info>
        </Tooltip>
        <span>
          {isLoading
            ? taxableEquivalentRate
            : taxableEquivalentRate.toPrecision(3)}
          %
        </span>
      </div>
    </StyltedPremiumBondsSavingsAccountComparison>
  );
};

export default PremiumBondsSavingsAccountComparison;
