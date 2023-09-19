import styled from "styled-components";
import MainNav from "./MainNav";
import Logo from "./Logo";

const StyledSidebar = styled.aside`
  grid-row: 1 / -1;

  background-color: var(--color-slate-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-slate-200);

  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const Sidebar: React.FC = () => {
  return (
    <StyledSidebar>
      <Logo />

      <MainNav />
    </StyledSidebar>
  );
};

export default Sidebar;
