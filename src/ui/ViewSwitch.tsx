import { createContext, useContext, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledViewSwitchContainer = styled.section`
  width: min(100%, 55rem);
  padding-top: 0;
  background-color: var(--color-slate-0);
  border: 1px solid var(--color-slate-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const Padder = styled.div`
  padding: 2.4rem 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const SwitcherContainer = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;

const StyledSwitchOption = styled.li<{ $active: boolean }>`
  flex: 1 1 0;
  text-align: center;
  padding: 1.2rem 1.6rem;
  font-size: 1.9rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  color: var(--color-slate-500);

  transition: color 0.3s ease-in-out, background 0.3s ease-in-out;

  &:not(:last-child) {
    border-right: 1px solid var(--color-slate-100);
  }

  &:hover {
    background: var(--color-slate-100);
    color: inherit;
  }

  ${(props) =>
    props.$active &&
    css`
      background: var(--color-slate-0);
      color: inherit;

      &:hover {
        background: inherit;
      }
    `}

  ${(props) =>
    !props.$active &&
    css`
      background: var(--color-slate-200);
    `}
`;

type ViewSwitch<T> = T & {
  Outlet: React.FC<{ views: { [key: string]: React.ReactElement } }>;
};

const ActiveViewContext = createContext<string>("");

const ViewSwitch: ViewSwitch<
  React.FC<{
    selections: { [key: string]: string };
    children: React.ReactNode;
  }>
> = ({ selections, children }) => {
  const [activeView, setActiveView] = useState<string>(
    Object.keys(selections)[0]
  );

  const [params, setParams] = useSearchParams();

  const { success } = useParams();
  const navigate = useNavigate();

  const comparisonView =
    params.get("view") || (success ? "signup" : activeView);

  return (
    <StyledViewSwitchContainer>
      <ActiveViewContext.Provider value={comparisonView}>
        <ViewSwitcher>
          {Object.entries(selections).map(([key, value]) => {
            return (
              <SwitchOption
                key={key}
                onClick={() => {
                  setActiveView(key);
                  navigate("/");
                  setParams({ view: key });
                }}
                $active={key === comparisonView}
              >
                {value}
              </SwitchOption>
            );
          })}
        </ViewSwitcher>

        <Padder>{children}</Padder>
      </ActiveViewContext.Provider>
    </StyledViewSwitchContainer>
  );
};

const ViewSwitcher: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <SwitcherContainer>{children}</SwitcherContainer>;
};

const SwitchOption: React.FC<{
  onClick: () => void;
  $active: boolean;
  children: React.ReactNode;
}> = ({ onClick, $active, children }) => {
  return (
    <StyledSwitchOption onClick={onClick} $active={$active}>
      {children}
    </StyledSwitchOption>
  );
};

const Outlet: React.FC<{ views: { [key: string]: React.ReactElement } }> = ({
  views,
}) => {
  const activeView = useContext(ActiveViewContext);
  const [params] = useSearchParams();

  return Object.entries(views)
    .filter(([key]) => key === (params.get("view") || activeView))
    .map(([, value]) => value);
};

ViewSwitch.Outlet = Outlet;

export default ViewSwitch;
