import { HomeIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-slate-500);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;

    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-slate-700);
    background-color: var(--color-slate-50);
    border-radius: 4px;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-slate-400);

    transition: color 0.2s ease-in-out;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-500);
  }
`;

const MainNav: React.FC = () => {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HomeIcon />
            <span>Dashboard</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/premium-bonds">
            <SparklesIcon />
            <span>Premium Bonds</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
};

export default MainNav;
