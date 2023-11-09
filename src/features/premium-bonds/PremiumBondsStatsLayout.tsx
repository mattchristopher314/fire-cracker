import styled from "styled-components";
import { PBJSONData } from "../../services/supabase";
import { BanknotesIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { LuClover } from "react-icons/lu";
import MinorStat from "../../ui/MinorStat";
import Fraction from "../../ui/Fraction";
import { differenceInDays, endOfToday, formatDistanceToNow } from "date-fns";
import { GiInvertedDice3 } from "react-icons/gi";

const StyledPremiumBondsStatsLayout = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
  gap: 1.2rem 2.4rem;
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

      <MinorStat icon={<CalendarDaysIcon />} title="Next Draw" color="blue">
        {differenceInDays(new Date(data.nextDraw), endOfToday()) < 1
          ? "Results soon"
          : formatDistanceToNow(new Date(data.nextDraw), {
              addSuffix: true,
            })}
      </MinorStat>

      <MinorStat
        icon={<LuClover style={{ strokeWidth: "1.5" }} />}
        title="Win Probability / Bond"
        color="yellow"
      >
        <Fraction numerator="1" denominator={data.oddsReciprocal.toString()} />
      </MinorStat>

      <MinorStat
        icon={<GiInvertedDice3 style={{ strokeWidth: "10" }} />}
        title="Win Probability / Draw"
        color="green"
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
