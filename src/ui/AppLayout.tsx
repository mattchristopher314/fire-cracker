import { Outlet } from "react-router-dom";
import { styled } from "styled-components";

import { useLocationAsTitle } from "../hooks/useLocationAsTitle";

import { breaks } from "../styles/GlobalStyles";
import Header from "./Header";
import Navigation from "./Navigation";
import { ProfileProvider } from "../context/ProfileProvider";

const StyledAppLayout = styled.div`
  position: relative;

  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: 6.1rem 1fr;

  height: 100dvh;
  overflow-y: auto;
  overflow-x: hidden;

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
    <ProfileProvider>
      <StyledAppLayout>
        <Header>{tabTitle}</Header>
        <Navigation />

        <MainArea>
          <Container>
            <Outlet />
          </Container>
        </MainArea>
      </StyledAppLayout>
    </ProfileProvider>
  );
};

export default AppLayout;
