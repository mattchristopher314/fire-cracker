import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const MainArea = styled.div`
  background-color: #ddd;
  overflow-y: scroll;
`;

const Container = styled.div`
  max-width: 160rem;
  margin: 0 auto;
`;

const AppLayout: React.FC = () => {
  return (
    <StyledAppLayout>
      <Header />
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
