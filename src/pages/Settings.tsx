import styled from "styled-components";
import UpdateUserSettingsForm from "../features/profile/UpdateUserSettingsForm";
import { useProfileSettings } from "../features/profile/useProfileSettings";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";
import { useTaxBand, useTaxableEquivalentAmount } from "../utils";
import MinorStat from "../ui/MinorStat";
import { BanknotesIcon, ChartPieIcon } from "@heroicons/react/24/outline";
import { breaks } from "../utils/constants";
import { TaxJSONData } from "../services/supabase";

const SettingsInfoLayout = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, 24rem);
  gap: 1.2rem 2.4rem;

  @media ${breaks.AppMinNavPoint} {
    grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
  }
`;

const Settings: React.FC = () => {
  const { isLoading: isLoadingSettings, settings } = useProfileSettings([
    "income",
  ]);

  const { isLoading: isLoadingTaxBand, data: taxBand } = useTaxBand(
    Number(settings?.income)
  );

  const { isLoading: isLoadingTaxFreeInterest, taxFreeSavingsAllowance } =
    useTaxableEquivalentAmount(0);

  const isLoading =
    isLoadingSettings || isLoadingTaxBand || isLoadingTaxFreeInterest;

  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading as="h1">Settings</Heading>

      <Row>
        <Heading as="h3">Info</Heading>
        <SettingsInfoLayout>
          <MinorStat icon={<BanknotesIcon />} title="Tax band" color="blue">
            {isLoadingTaxBand
              ? "Loading..."
              : (taxBand as TaxJSONData["rates"][number])?.rate}
            %
          </MinorStat>

          <MinorStat
            icon={<ChartPieIcon />}
            title="Tax-free Interest"
            color="green"
          >
            £{taxFreeSavingsAllowance}
          </MinorStat>
        </SettingsInfoLayout>
      </Row>

      <Row>
        <Heading as="h3">Update Settings</Heading>
        <UpdateUserSettingsForm isLoading={isLoading} settings={settings} />
      </Row>
    </>
  );
};

export default Settings;
