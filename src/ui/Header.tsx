import { styled } from "styled-components";
import HeaderMenu from "./HeaderMenu";
import User from "../features/authentication/User";
import { breaks } from "../utils/constants";

const StyledHeader = styled.header`
  background-color: var(--color-slate-0);
  padding: 1.2rem 1.2rem 1.2rem 3.2rem;
  border-bottom: 1px solid var(--color-slate-200);

  display: flex;
  align-items: center;
  gap: 0.8rem;

  @media ${breaks.AppMinNavPoint} {
    justify-content: space-between;
    overflow: hidden;

    padding: 1.2rem 1.2rem 1.2rem 1.6rem;
  }
`;

const StyledHeaderText = styled.h1`
  font-weight: 500;
  font-size: 2rem;
  letter-spacing: 0.5px;

  @media ${breaks.AppMinNavPoint} {
    display: none;
  }
`;

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <StyledHeader>
      <StyledHeaderText>{children}</StyledHeaderText>

      <User />
      <HeaderMenu />
    </StyledHeader>
  );
};

export default Header;
