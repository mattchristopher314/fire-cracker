import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { createContext, useContext, useState } from "react";
import styled from "styled-components";

type Accordion<T> = T & {
  AccordionItem: React.FC<{
    children: React.ReactNode;
    title: string;
    id: number;
  }>;
};

const StyledAccordion = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const Accordion: Accordion<
  React.FC<{ children: React.ReactNode; multiopen?: boolean }>
> = ({ children, multiopen = false }) => {
  const [activeId, setActiveId] = useState<number>();

  return (
    <AccordionContext.Provider value={{ activeId, setActiveId, multiopen }}>
      <StyledAccordion>{children}</StyledAccordion>
    </AccordionContext.Provider>
  );
};

const AccordionContext = createContext<{
  activeId: number | undefined;
  setActiveId: ((id: number | undefined) => void) | undefined;
  multiopen: boolean | undefined;
}>({
  activeId: undefined,
  setActiveId: undefined,
  multiopen: false,
});

const StyledAccordionOpener = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-slate-500);
  padding: 1.6rem;
  font-size: 2rem;
  font-weight: 500;
  border-bottom: 1px solid var(--color-slate-200);
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease-in-out;

  &::before {
    content: "";
    box-sizing: content-box;
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: left center;
    transform: scaleX(0);
    width: 100%;
    height: 100%;
    border-bottom: 1px solid var(--color-brand-lo);
    transition: transform 0.3s ease-in-out;
  }

  &:hover {
    color: var(--color-slate-700);
  }

  &.highlight::before,
  &:hover::before {
    transform: initial;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    stroke-width: 0.2rem;
  }

  &.highlight svg {
    color: var(--color-brand-lo);
  }
`;

const AccordionItem: React.FC<{
  children: React.ReactNode;
  title: string;
  id: number;
}> = ({ children, title, id }) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const { activeId, setActiveId, multiopen } = useContext(AccordionContext);

  const currentlyOpen =
    (isToggled && multiopen) || (!multiopen && activeId === id);

  return (
    <div>
      <StyledAccordionOpener
        onClick={() => {
          setIsToggled((cur) => !cur);

          if (setActiveId) {
            setActiveId(id === activeId ? undefined : id);
          }
        }}
        className={currentlyOpen ? "highlight" : ""}
      >
        {title}
        {currentlyOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
      </StyledAccordionOpener>

      {currentlyOpen && children}
    </div>
  );
};

Accordion.AccordionItem = AccordionItem;

export default Accordion;
