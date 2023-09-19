import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    text-decoration: none;
    color: var(--color-cyan-950);

    transition: color 0.2s ease-in-out;
  }

  &:hover,
  &:active {
    color: var(--color-brand-lo);
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`;

const LogoImg = styled.img`
  height: 3.2rem;
  width: auto;
`;

const LogoText = styled.h1`
  font-size: 2.6rem;
  font-weight: 600;

  letter-spacing: -0.5px;
`;

const Logo: React.FC = () => {
  return (
    <StyledLogo>
      <StyledNavLink to="/dashboard">
        <LogoImg src="/FIRECracker-small.png" alt="FIRECracker logo" />
        <LogoText>FIRECracker</LogoText>
      </StyledNavLink>
    </StyledLogo>
  );
};

export default Logo;
