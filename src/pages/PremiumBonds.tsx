import { usePremiumBondsStats } from "../features/premium-bonds/usePremiumBondsStats";
import Spinner from "../ui/Spinner";

const PremiumBonds: React.FC = () => {
  const { isLoading, stats } = usePremiumBondsStats();

  if (isLoading) return <Spinner />;

  return <div>{JSON.stringify(stats)}</div>;
};

export default PremiumBonds;
