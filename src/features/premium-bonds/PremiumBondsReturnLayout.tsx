import styled from "styled-components";
import MajorStatContainer from "../../ui/MajorStatContainer";
import ReturnsPie from "./data-vis/ReturnsPie";
import { PBJSONData } from "../../services/supabase";
import { useEffect, useState } from "react";
import MiniSpinner from "../../ui/MiniSpinner";
import { MedianReturn } from "./calculatePremiumBondStats";
import PremiumBondsSavingsAccountComparison from "./PremiumBondsSavingsAccountComparison";

const StyledPremiumBondsReturnLayout = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
  gap: 1.2rem 2.4rem;
`;

const PremiumBondsReturnLayout: React.FC<{
  holding: number | null;
  data: PBJSONData;
}> = ({ holding, data }) => {
  const [medianAnnualReturn, setMedianAnnualReturn] = useState<number>(0);
  const [isLoadingMedianAnnualReturn, setIsLoadingMedianAnnualReturn] =
    useState(true);

  useEffect(() => {
    const worker = new Worker(
      new URL("./data-vis/returns.worker", import.meta.url)
    );

    (async () => {
      setIsLoadingMedianAnnualReturn(true);

      worker.postMessage({ holding, data, colours: ["slate"], months: 12 });
      worker.addEventListener("message", (message) => {
        const res = message.data;

        setMedianAnnualReturn(MedianReturn(res));
        setIsLoadingMedianAnnualReturn(false);
      });
    })();

    return () => {
      worker.terminate();
    };
  }, [data, holding]);

  return (
    <StyledPremiumBondsReturnLayout>
      <MajorStatContainer title="Monthly Win Probabilities">
        <ReturnsPie holding={holding} data={data} />

        <span
          style={{
            fontSize: "1.6rem",
            fontWeight: "500",
            color: "var(--color-slate-600)",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.8rem",
          }}
        >
          Median annual return:{" "}
          {isLoadingMedianAnnualReturn && (holding || 0) > 20000 ? (
            <MiniSpinner size="14px" />
          ) : (
            `£${medianAnnualReturn}`
          )}
        </span>
      </MajorStatContainer>

      <MajorStatContainer title="Savings Account Comparison">
        <PremiumBondsSavingsAccountComparison
          holding={holding || 0}
          medianAnnualReturn={medianAnnualReturn}
        />
      </MajorStatContainer>
    </StyledPremiumBondsReturnLayout>
  );
};

export default PremiumBondsReturnLayout;
