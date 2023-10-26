import PremiumBondsAllocationTable from "../features/premium-bonds/PremiumBondsAllocationTable";
import { usePremiumBondsStats } from "../features/premium-bonds/usePremiumBondsStats";
import Accordion from "../ui/Accordion";
import Spinner from "../ui/Spinner";

const PremiumBonds: React.FC = () => {
  const { isLoading, data } = usePremiumBondsStats();

  if (isLoading || !(data && data.data)) return <Spinner />;

  return (
    <>
      <div>
        <p>Headline Rate: {data.data.averageRatePercentage}%</p>
        <p>Prize Probability per Bond: 1/{data.data.oddsReciprocal}</p>
      </div>

      <Accordion multiopen>
        <Accordion.AccordionItem title="Stats" id={1}>
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
