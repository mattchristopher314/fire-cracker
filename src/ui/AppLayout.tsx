import { Outlet } from "react-router-dom";
import { styled } from "styled-components";

import { useLocationAsTitle } from "../hooks/useLocationAsTitle";

import Header from "./Header";
import Navigation from "./Navigation";
import { ProfileProvider } from "../context/ProfileProvider";
import Container from "./Container";
import { breaks } from "../utils/constants";
import { usePageTitle } from "../hooks/usePageTitle";

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

const MainArea = styled.main`
  background-color: var(--color-slate-50);
  overflow-y: scroll;
  padding: 3.2rem;

  color: var(--color-slate-900);

  @media ${breaks.AppMinNavPoint} {
    grid-column: 1 / -1;
  }
`;

const AppLayout: React.FC = () => {
  const tabTitle = useLocationAsTitle();
  usePageTitle(tabTitle, true);

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
