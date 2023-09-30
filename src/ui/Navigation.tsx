import styled from "styled-components";
import MainNav from "./MainNav";
import Logo from "./Logo";
import { breaks } from "../styles/GlobalStyles";
import NavigationDrawer from "./NavigationDrawer";
import { useState } from "react";
import IconButton from "./IconButton";
import { XMarkIcon } from "@heroicons/react/24/outline";

const StyledNavigation = styled.aside<{ $show?: boolean }>`
  grid-row: 1 / -1;

  background-color: var(--color-slate-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-slate-200);

  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  position: relative;
  transform: translateX(-100%);

  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  @media ${breaks.AppNavPoint} {
    /* display: ${(props) => (props.$show ? "flex" : "none")}; */

    opacity: ${(props) => (props.$show ? 1 : 0)};
    visibility: ${(props) => (props.$show ? "visible" : "hidden")};
    pointer-events: ${(props) => (props.$show ? "auto" : "none")};

    transform: ${(props) =>
      props.$show ? "translateX(0)" : "translateX(-100%)"};

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;

    background-color: var(--color-slate-0-trans);

    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);

    border-right: none;
  }
`;

const CloseButton = styled(IconButton)`
  display: none;
  position: absolute;
  top: 0;
  right: 0;

  margin: 1.2rem;

  @media ${breaks.AppNavPoint} {
    display: block;
  }

  & svg {
    width: 3.2rem;
    height: 3.2rem;
  }
`;

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openNav = () => {
    setIsOpen(true);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  return (
    <>
      <NavigationDrawer onClick={openNav} />

      <StyledNavigation $show={isOpen}>
        <CloseButton onClick={closeNav}>
          <XMarkIcon />
        </CloseButton>

        <Logo />
        <MainNav onClick={closeNav} />
      </StyledNavigation>
    </>
  );
};

export default Navigation;
