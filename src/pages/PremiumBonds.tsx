import PremiumBondsAllocationTable from "../features/premium-bonds/PremiumBondsAllocationTable";
import { usePremiumBondsStats } from "../features/premium-bonds/usePremiumBondsStats";
import Spinner from "../ui/Spinner";

const PremiumBonds: React.FC = () => {
  const { isLoading, data } = usePremiumBondsStats();

  if (isLoading || !(data && data.data)) return <Spinner />;

  return (
    <>
      <p>Headline Rate: {data.data.averageRatePercentage}%</p>
      <p>Prize Probability per Bond: 1/{data.data.oddsReciprocal}</p>

      <PremiumBondsAllocationTable
        data={data.data.prizeAllocations}
        source={data.source || ""}
        source_updated={data.source_updated || ""}
      ></PremiumBondsAllocationTable>
    </>
  );
};

export default PremiumBonds;
