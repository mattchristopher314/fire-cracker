import styled, { css } from "styled-components";
import { Payload } from "./MinorStat";

const StyledFraction = styled.div`
  display: inline-grid;
  grid-template-columns: auto 2rem auto;
  grid-template-rows: auto 0.1rem auto;
  flex-direction: column;
  text-align: center;
`;

const StyledDivider = styled.span`
  grid-row: 2;
  grid-column: 2;
  background-color: var(--color-slate-800);
  transform: rotate(-45deg);
  transform-origin: center center;
  width: 100%;
`;

const StyledFractionPart = styled.span<{ $isDenominator?: boolean }>`
  ${Payload} & {
    font-size: 1.2rem;
  }

  &:first-child {
    transform: translate(0.4rem, 0.2rem);
  }

  &:last-child {
    transform: translate(-0.4rem, -0.2rem);
  }

  ${(props) =>
    !props.$isDenominator
      ? css`
          grid-row: 1;
          grid-column: 1;
        `
      : css`
          grid-row: 3;
          grid-column: 3;
        `}
`;

StyledFractionPart.defaultProps = {
  $isDenominator: false,
};

const Fraction: React.FC<{ numerator: string; denominator: string }> = ({
  numerator,
  denominator,
}) => {
  return (
    <StyledFraction>
      <StyledFractionPart>{numerator}</StyledFractionPart>
      <StyledDivider />
      <StyledFractionPart $isDenominator>{denominator}</StyledFractionPart>
    </StyledFraction>
  );
};

export default Fraction;
