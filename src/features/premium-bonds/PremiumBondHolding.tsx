import styled from "styled-components";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import InlineInput from "../../ui/InlineInput";
import PreventWrap from "../../ui/PreventWrap";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import { useUpdateHolding } from "../../hooks/useUpdateHolding";

const StyledHoldingAmount = styled.span`
  font-size: 1.4rem;
  font-style: italic;
`;

const HoldingContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const PremiumBondHolding: React.FC<{
  heldAmount: number;
  holding: number;
  setHolding: React.Dispatch<React.SetStateAction<number | null>>;
}> = ({ heldAmount, holding, setHolding }) => {
  const updateHoldingMutation = useUpdateHolding("premium-bonds");

  const handleUpdateHolding = (): void => {
    const updateHolding = updateHoldingMutation.mutateAsync({
      vehicle: "premium-bonds",
      quantity: holding,
    });

    toast.promise(updateHolding, {
      loading: "Updating holding",
      success: "Successfully updated holding",
      error: (e: Error) => e.message,
    });
  };

  return (
    <Row $background>
      <Heading as="h3">
        <HoldingContainer>
          Holding:
          <PreventWrap>
            {" £"}
            <InlineInput
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={holding || ""}
              size={3}
              maxLength={6}
              max={100000}
              onChange={(e) => {
                if (
                  e.target.value &&
                  0 <= Number(e.target.value) &&
                  Number(e.target.value) <= 100000
                ) {
                  setHolding(Number(e.target.value));
                } else if (!e.target.value) {
                  setHolding(null);
                }
              }}
            />
          </PreventWrap>
          {heldAmount !== holding && (
            <Button
              $variation="primary"
              $size="small"
              onClick={handleUpdateHolding}
              disabled={updateHoldingMutation.isLoading}
            >
              Update Holding
            </Button>
          )}
        </HoldingContainer>
      </Heading>
      <StyledHoldingAmount>
        Currently, you have £{heldAmount} saved.
      </StyledHoldingAmount>
    </Row>
  );
};

export default PremiumBondHolding;
