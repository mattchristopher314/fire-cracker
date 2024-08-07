import styled from "styled-components";
import { PiPiggyBank } from "react-icons/pi";

import MajorStatContainer from "../../ui/MajorStatContainer";
import ReturnsPie from "./data-vis/ReturnsPie";
import { PBJSONData } from "../../services/supabase";
import { useEffect, useState } from "react";
import MiniSpinner from "../../ui/MiniSpinner";
import { MedianReturn } from "./calculatePremiumBondStats";
import PremiumBondsSavingsAccountComparison from "./PremiumBondsSavingsAccountComparison";
import Heading from "../../ui/Heading";

const StyledEmptyPremiumBondsReturnLayoutContainer = styled.section`
  padding: 5.6rem 6.4rem;

  background-color: var(--color-slate-0);
  border: 1px solid var(--color-slate-100);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
`;

const StyledStartSaving = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2.4rem;

  & svg {
    color: var(--color-slate-400);
    width: 4.8rem;
    height: 4.8rem;
    transform-origin: center center;
    transition: color 0.4s ease-in-out, transform 0.4s ease-in-out !important;
  }

  &:hover svg {
    color: var(--color-slate-400-hover);
    transform: scale(1.05);
    will-change: transform;
  }
`;

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

  return !holding ? (
    <StyledEmptyPremiumBondsReturnLayoutContainer>
      <StyledStartSaving>
        <PiPiggyBank />

        <Heading as="h2" color="var(--color-slate-600)">
          Start saving to see more stats!
        </Heading>
      </StyledStartSaving>
    </StyledEmptyPremiumBondsReturnLayoutContainer>
  ) : (
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
            `£${medianAnnualReturn.toFixed(2)}`
          )}
        </span>
      </MajorStatContainer>

      <MajorStatContainer title="Savings Account Comparison">
        <PremiumBondsSavingsAccountComparison
          holding={holding || 0}
          medianAnnualReturn={medianAnnualReturn}
          isLoadingMedianAnnualReturn={isLoadingMedianAnnualReturn}
        />
      </MajorStatContainer>
    </StyledPremiumBondsReturnLayout>
  );
};

export default PremiumBondsReturnLayout;
