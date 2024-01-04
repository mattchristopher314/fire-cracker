import { InformationCircleIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";

const StyledTooltipContainer = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
`;

type Tooltip<T> = T & {
  Main: React.FC<{ children?: React.ReactNode }>;
  Info: React.FC<{ children?: React.ReactNode }>;
};

const Tooltip: Tooltip<React.FC<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return <StyledTooltipContainer>{children}</StyledTooltipContainer>;
};

const Main = styled.div``;

const StyledInfoContainer = styled.div`
  position: absolute;
  display: none;
  background-color: var(--color-slate-50);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-slate-300);
  padding: 0.8rem;
  z-index: 1;
  right: 0;
  transform: translate(calc(50% - 16px), calc(50% + 12px));
  font-size: 80%;
  width: 70%;

  &:hover {
    cursor: help;
    display: block;
  }

  &::after {
    cursor: help;
    z-index: -1;
    content: "";
    width: 6px;
    height: 6px;
    position: absolute;
    left: 50%;
    top: 0;
    transform-origin: center;
    transform: translate(calc(-50% - 0.5px), -60%) rotate(-45deg);
    background-color: var(--color-slate-50);
    border: 1px solid var(--color-slate-300);
    border-left: none;
    border-bottom: none;
  }
`;

const StyledInfoButton = styled.span`
  display: block;
  width: 32px;
  height: 32px;
  cursor: help;
  padding: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    width: 16px;
    height: 16px;
  }

  &:hover + ${StyledInfoContainer} {
    display: block;
  }
`;

const Info: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <StyledInfoButton>
        <InformationCircleIcon />
      </StyledInfoButton>
      <StyledInfoContainer>{children}</StyledInfoContainer>
    </>
  );
};

Tooltip.Main = Main;
Tooltip.Info = Info;

export default Tooltip;
