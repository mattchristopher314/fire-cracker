import styled from "styled-components";
import MainNav from "./MainNav";
import Logo from "./Logo";
import { breaks } from "../styles/GlobalStyles";
import NavigationDrawer from "./NavigationDrawer";
import { useState } from "react";
import IconButton from "./IconButton";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useClickOut } from "../hooks/useClickOut";

const NAV_TRANSITION_DURATION = 300;

const Overlay = styled.div<{ $show?: boolean }>`
  width: 100dvw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.01);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;

  &.should-transition-nav {
    transition: transform ${NAV_TRANSITION_DURATION}ms ease-in-out,
      opacity ${NAV_TRANSITION_DURATION}ms ease-in-out,
      visibility ${NAV_TRANSITION_DURATION}ms ease-in-out;
  }

  @media ${breaks.AppNavPoint} {
    opacity: ${(props) => (props.$show ? 1 : 0)};
    visibility: ${(props) => (props.$show ? "visible" : "hidden")};
    pointer-events: ${(props) => (props.$show ? "auto" : "none")};
  }

  @media ${breaks.AppFullWidthNavPoint} {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
`;

const StyledNavigation = styled.aside<{ $show?: boolean }>`
  grid-row: 1 / -1;

  background-color: var(--color-slate-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-slate-200);

  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  position: relative;
  z-index: 2;

  &.should-transition-nav {
    transition: transform ${NAV_TRANSITION_DURATION}ms ease-in-out,
      opacity ${NAV_TRANSITION_DURATION}ms ease-in-out,
      visibility ${NAV_TRANSITION_DURATION}ms ease-in-out;
  }

  @media ${breaks.AppNavPoint} {
    opacity: ${(props) => (props.$show ? 1 : 0)};
    visibility: ${(props) => (props.$show ? "visible" : "hidden")};
    pointer-events: ${(props) => (props.$show ? "auto" : "none")};

    transform: ${(props) =>
      props.$show ? "translateX(0)" : "translateX(-100%)"};

    position: absolute;
    top: 0;
    left: 0;
    min-height: 100dvh;

    width: min(100%, 45rem);

    background-color: var(--color-slate-0-trans);
  }

  @media ${breaks.AppFullWidthNavPoint} {
    width: 100%;
    border: none;

    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
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
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isAnimatingOverlay, setIsAnimatingOverlay] = useState<boolean>(false);

  const openNav = () => {
    setIsOpen(true);
    setIsAnimating(true);
    setIsAnimatingOverlay(true);

    setTimeout(() => {
      setIsAnimatingOverlay(false);
    }, NAV_TRANSITION_DURATION);
  };

  const closeNav = () => {
    setIsOpen(false);
    setIsAnimating(true);
    setIsAnimatingOverlay(true);

    setTimeout(() => {
      setIsAnimating(false);
      setIsAnimatingOverlay(false);
    }, NAV_TRANSITION_DURATION);
  };

  const ref = useClickOut(closeNav);

  return (
    <>
      <NavigationDrawer onClick={openNav} />
      <Overlay
        $show={isOpen}
        className={isAnimatingOverlay ? "should-transition-nav" : ""}
      />

      <StyledNavigation
        $show={isOpen}
        className={isAnimating ? "should-transition-nav" : ""}
        ref={ref}
      >
        <CloseButton onClick={closeNav}>
          <XMarkIcon />
        </CloseButton>

        <Logo onClick={closeNav} to="/dashboard" />
        <MainNav onClick={closeNav} />
      </StyledNavigation>
    </>
  );
};

export default Navigation;
