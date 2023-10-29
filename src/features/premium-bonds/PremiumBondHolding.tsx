import Slider from "../../ui/Slider";

const PremiumBondHolding: React.FC<{
  heldAmount: number;
  holding: number;
  setHolding: React.Dispatch<React.SetStateAction<number>>;
}> = ({ heldAmount, holding, setHolding }) => {
  return (
    <>
      <p>You hold: £{heldAmount}.</p>
      <p>Viewing stats for: £{holding}.</p>
      <Slider
        min={0}
        max={100000}
        value={holding}
        onChange={(e) => setHolding(Number(e.target.value))}
      />
    </>
  );
};

export default PremiumBondHolding;
