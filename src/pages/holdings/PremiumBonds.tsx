import { useEffect, useState } from "react";
import PremiumBondsAllocationTable from "../../features/premium-bonds/PremiumBondsAllocationTable";
import { usePremiumBondsStats } from "../../features/premium-bonds/usePremiumBondsStats";
import Accordion from "../../ui/Accordion";
import Spinner from "../../ui/Spinner";
import { useHolding } from "../../hooks/useHolding";
import PremiumBondHolding from "../../features/premium-bonds/PremiumBondHolding";
import PremiumBondsStatsLayout from "../../features/premium-bonds/PremiumBondsStatsLayout";
import PremiumBondsReturnLayout from "../../features/premium-bonds/PremiumBondsReturnLayout";

const PremiumBonds: React.FC = () => {
  const { isLoading: isLoadingStats, data } = usePremiumBondsStats();

  const { isLoading: isLoadingHolding, holding: holdingInfo } =
    useHolding("premium-bonds");
  const amount = holdingInfo?.quantity || 0;

  const [holding, setHolding] = useState<number | null>(amount);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  const isLoading = isLoadingStats || isLoadingHolding;

  useEffect(() => {
    setHolding(amount);

    setIsInitialLoad(false);
  }, [amount]);

  if (isLoading || !(data && data.data)) return <Spinner />;

  return (
    <>
      <PremiumBondHolding
        heldAmount={amount}
        holding={isInitialLoad ? holding || amount : holding}
        setHolding={setHolding}
      ></PremiumBondHolding>

      <PremiumBondsStatsLayout
        holding={isInitialLoad ? holding || amount : holding}
        data={data.data}
      />

      <PremiumBondsReturnLayout
        holding={isInitialLoad ? holding || amount : holding}
        data={data.data}
      />

      <Accordion multiopen>
        <Accordion.AccordionItem title="Prize Draw Stats" id={1}>
          <PremiumBondsAllocationTable
            data={data.data.prizeAllocations}
            source={data.source || ""}
            source_updated={data.source_updated || ""}
          />
        </Accordion.AccordionItem>
      </Accordion>
    </>
  );
};

export default PremiumBonds;
