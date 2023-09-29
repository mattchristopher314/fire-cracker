import { styled } from "styled-components";
import HeaderMenu from "./HeaderMenu";

const StyledHeader = styled.header`
  background-color: var(--color-slate-0);
  padding: 1.2rem 3.2rem;
  border-bottom: 1px solid var(--color-slate-200);

  font-size: 2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <StyledHeader>
      {children}

      <HeaderMenu />
    </StyledHeader>
  );
};

export default Header;
