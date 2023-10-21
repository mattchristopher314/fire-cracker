import PremiumBondsAllocationTable from "../features/premium-bonds/PremiumBondsAllocationTable";
import { usePremiumBondsStats } from "../features/premium-bonds/usePremiumBondsStats";
import Spinner from "../ui/Spinner";

const PremiumBonds: React.FC = () => {
  const { isLoading, stats } = usePremiumBondsStats();

  if (isLoading || !stats) return <Spinner />;

  return (
    <>
      <p>Headline Rate: {stats.averageRatePercentage}</p>
      <p>Prize Probability per Bond: 1/{stats.oddsReciprocal}</p>

      <PremiumBondsAllocationTable
        data={stats.prizeAllocations}
      ></PremiumBondsAllocationTable>
    </>
  );
};

export default PremiumBonds;
