import { NavLink, To } from "react-router-dom";
import styled, { css } from "styled-components";
import { breaks } from "../utils/constants";

const StyledLogo = styled.div`
  text-align: center;
`;

const StyledNavLink = styled(NavLink)<{ $hasHoverEffect: boolean }>`
  &:link,
  &:visited {
    text-decoration: none;
    color: var(--color-cyan-950);

    transition: color 0.2s ease-in-out !important;
  }

  ${(props) =>
    props.$hasHoverEffect
      ? css`
          &:hover,
          &:active {
            color: var(--color-brand-lo);
          }
        `
      : css`
          cursor: default;
        `}

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`;

const LogoImg = styled.img<{ size?: string }>`
  ${(props) =>
    props.size === "regular" &&
    css`
      height: 3.2rem;

      @media ${breaks.AppNavPoint} {
        height: 4.8rem;
      }
    `}
  ${(props) =>
    props.size === "large" &&
    css`
      height: 4.8rem;
    `}
  
  width: auto;
`;

const LogoText = styled.h1<{ size?: string }>`
  ${(props) =>
    props.size === "regular" &&
    css`
      font-size: 2.5rem;

      @media ${breaks.AppNavPoint} {
        font-size: 3.1rem;
      }
    `}
  ${(props) =>
    props.size === "large" &&
    css`
      font-size: 3.1rem;
    `}

  font-weight: 600;

  letter-spacing: -0.5px;
`;

const Logo: React.FC<{
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  to?: To;
  size?: string;
}> = ({ onClick, to, size = "regular" }) => {
  return (
    <StyledLogo onClick={onClick}>
      <StyledNavLink to={to || ""} $hasHoverEffect={!!onClick || !!to}>
        <LogoImg
          src="/FIRECracker-small.png"
          alt="FIRECracker logo"
          size={size}
        />
        <LogoText size={size}>FIRECracker</LogoText>
      </StyledNavLink>
    </StyledLogo>
  );
};

export default Logo;
