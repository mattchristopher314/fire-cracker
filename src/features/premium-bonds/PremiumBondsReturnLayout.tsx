import styled from "styled-components";
import MajorStatContainer from "../../ui/MajorStatContainer";
import ReturnsPie from "./data-vis/ReturnsPie";
import { PBJSONData } from "../../services/supabase";
import { EstimateReturns, MedianReturn } from "./calculatePremiumBondsStats";

const StyledPremiumBondsReturnLayout = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(36rem, 1fr));
  gap: 1.2rem 2.4rem;
`;

const PremiumBondsReturnLayout: React.FC<{
  holding: number | null;
  data: PBJSONData;
}> = ({ holding, data }) => {
  const medianAnnualReturn = MedianReturn(
    EstimateReturns(holding, data, ["slate"], 12)
  );

  return (
    <StyledPremiumBondsReturnLayout>
      <MajorStatContainer title="Monthly Win Probabilities">
        <ReturnsPie holding={holding} data={data} />

        <span
          style={{
            fontSize: "1.6rem",
            fontWeight: "500",
            color: "var(--color-slate-600)",
          }}
        >
          Median annual return: £{medianAnnualReturn}
        </span>
      </MajorStatContainer>

      <MajorStatContainer title="Savings Account Comparison">
        Tax/Return breakdown
      </MajorStatContainer>
    </StyledPremiumBondsReturnLayout>
  );
};

export default PremiumBondsReturnLayout;
