import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { breaks } from "../styles/GlobalStyles";

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

  @media ${breaks.AppNavPoint} {
    height: 4.8rem;
  }
`;

const LogoText = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;

  letter-spacing: -0.5px;

  @media ${breaks.AppNavPoint} {
    font-size: 3.1rem;
  }
`;

const Logo: React.FC<{
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}> = ({ onClick }) => {
  return (
    <StyledLogo onClick={onClick}>
      <StyledNavLink to="/dashboard">
        <LogoImg src="/FIRECracker-small.png" alt="FIRECracker logo" />
        <LogoText>FIRECracker</LogoText>
      </StyledNavLink>
    </StyledLogo>
  );
};

export default Logo;
