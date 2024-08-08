import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import styled, { css } from "styled-components";

const StyledMultiNavContainer = styled.div`
  /* border: 1px solid green; */
`;

const StyledToggler = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  cursor: pointer;

  color: var(--color-slate-500);
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1.2rem 2.4rem;

  transition:
    color 0.2s ease-in-out,
    background-color 0.2s ease-in-out;

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-slate-400);

    transition: color 0.2s ease-in-out !important;
  }

  ${(props) =>
    props.$isExpanded &&
    css`
      color: var(--color-slate-700);
      background-color: var(--color-slate-50);
      border-radius: var(--border-radius-sm);

      & svg {
        color: var(--color-brand-lo) !important;
      }
    `}
`;

const SelectionHolder = styled.div<{ $isExpanded: boolean }>`
  display: none;

  ${(props) =>
    props.$isExpanded &&
    css`
      display: block;
    `}
`;

const MultiNav: React.FC<{
  sectionTitle: string;
  children: React.ReactNode;
}> = ({ sectionTitle, children }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Change repeated $isExpanded to context.

  return (
    <StyledMultiNavContainer>
      <StyledToggler
        $isExpanded={isExpanded}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
        <span>{sectionTitle}</span>
      </StyledToggler>

      <SelectionHolder $isExpanded={isExpanded}>{children}</SelectionHolder>
    </StyledMultiNavContainer>
  );
};

export default MultiNav;
