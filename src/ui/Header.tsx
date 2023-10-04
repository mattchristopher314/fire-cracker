import { styled } from "styled-components";
import HeaderMenu from "./HeaderMenu";
import User from "../features/authentication/User";

const StyledHeader = styled.header`
  background-color: var(--color-slate-0);
  padding: 1.2rem 1.2rem 1.2rem 3.2rem;
  border-bottom: 1px solid var(--color-slate-200);

  font-size: 2rem;

  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <StyledHeader>
      {children}

      <User />
      <HeaderMenu />
    </StyledHeader>
  );
};

export default Header;
