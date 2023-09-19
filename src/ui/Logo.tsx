import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    text-decoration: none;
    color: var(--color-brand-800);

    transition: color 0.2s ease-in-out;
  }

  &:hover,
  &:active {
    color: var(--color-brand-600);
  }
`;

const TempLogo = styled.h1`
  font-size: 2.6rem;
  font-weight: 600;

  letter-spacing: 0.5px;
`;

const Logo: React.FC = () => {
  return (
    <StyledLogo>
      <StyledNavLink to="/dashboard">
        <TempLogo>FIRECracker</TempLogo>
      </StyledNavLink>
    </StyledLogo>
  );
};

export default Logo;
