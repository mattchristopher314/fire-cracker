import { Outlet, useLocation } from "react-router-dom";
import { styled } from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useLocationAsTitle } from "../hooks/useLocationAsTitle";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const MainArea = styled.div`
  background-color: var(--color-slate-50);
  overflow-y: scroll;
  padding: 3.2rem;
`;

const Container = styled.div`
  max-width: 140rem;
  margin: 0 auto;
`;

const AppLayout: React.FC = () => {
  const tabTitle = useLocationAsTitle();

  return (
    <StyledAppLayout>
      <Header>{tabTitle}</Header>
      <Sidebar />

      <MainArea>
        <Container>
          <Outlet />
        </Container>
      </MainArea>
    </StyledAppLayout>
  );
};

export default AppLayout;
