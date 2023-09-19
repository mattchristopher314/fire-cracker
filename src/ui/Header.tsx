import { styled } from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-slate-0);
  padding: 1.2rem 3.2rem;
  border-bottom: 1px solid var(--color-slate-200);

  font-size: 2rem;
`;

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <StyledHeader>{children}</StyledHeader>;
};

export default Header;
