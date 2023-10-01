import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import { breaks } from "../styles/GlobalStyles";
import { useLocationAsTitle } from "../hooks/useLocationAsTitle";
import Header from "./Header";
import Navigation from "./Navigation";

const StyledAppLayout = styled.div`
  position: relative;

  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  @media ${breaks.AppNavPoint} {
    grid-template-columns: auto 1fr;
  }
`;

const MainArea = styled.div`
  background-color: var(--color-slate-50);
  overflow-y: scroll;
  padding: 3.2rem;

  @media ${breaks.AppMinNavPoint} {
    grid-column: 1 / -1;
  }
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
      <Navigation />

      <MainArea>
        <Container>
          <Outlet />
        </Container>
      </MainArea>
    </StyledAppLayout>
  );
};

export default AppLayout;
