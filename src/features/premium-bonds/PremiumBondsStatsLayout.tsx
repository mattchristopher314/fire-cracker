import styled from "styled-components";
import { PBJSONData } from "../../services/supabase";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import MinorStat from "../../ui/MinorStat";
import Fraction from "../../ui/Fraction";

const StyledPremiumBondsStatsLayout = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
  gap: 2.4rem;
`;

const PremiumBondsStatsLayout: React.FC<{
  holding: number | null;
  data: PBJSONData;
}> = ({ holding, data }) => {
  return (
    <StyledPremiumBondsStatsLayout>
      <MinorStat icon={<BanknotesIcon />} title="Prize Fund Rate" color="cyan">
        {data.averageRatePercentage}%
      </MinorStat>

      <MinorStat icon={<BanknotesIcon />} title="Next Draw" color="blue">
        {new Date(data.nextDraw).toLocaleDateString()}
      </MinorStat>

      <MinorStat
        icon={<BanknotesIcon />}
        title="Win Probability / Bond"
        color="slate"
      >
        <Fraction numerator="1" denominator={data.oddsReciprocal.toString()} />
      </MinorStat>

      <MinorStat
        icon={<BanknotesIcon />}
        title="Win Probability / Draw"
        color="cyan"
      >
        {(
          (1 - (1 - 1 / data.oddsReciprocal) ** (holding || 0)) *
          100
        ).toPrecision(3)}
        %
      </MinorStat>
    </StyledPremiumBondsStatsLayout>
  );
};

export default PremiumBondsStatsLayout;
