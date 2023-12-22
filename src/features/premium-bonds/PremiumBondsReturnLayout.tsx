import styled from "styled-components";
import MajorStatContainer from "../../ui/MajorStatContainer";
import ReturnsPie from "./data-vis/ReturnsPie";
import { PBJSONData } from "../../services/supabase";

const StyledPremiumBondsReturnLayout = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(36rem, 1fr));
  gap: 1.2rem 2.4rem;
`;

const PremiumBondsReturnLayout: React.FC<{
  holding: number | null;
  data: PBJSONData;
}> = ({ holding, data }) => {
  return (
    <StyledPremiumBondsReturnLayout>
      <MajorStatContainer title="Monthly Win Probabilities">
        <ReturnsPie holding={holding} data={data} />
      </MajorStatContainer>

      <MajorStatContainer title="Savings Account Comparison">
        Tax/Return breakdown
      </MajorStatContainer>
    </StyledPremiumBondsReturnLayout>
  );
};

export default PremiumBondsReturnLayout;
