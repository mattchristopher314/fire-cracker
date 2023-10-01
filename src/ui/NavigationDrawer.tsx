import { Bars3Icon } from "@heroicons/react/24/outline";
import IconButton from "./IconButton";
import styled from "styled-components";
import { breaks } from "../styles/GlobalStyles";

const DrawerContainer = styled.div`
  grid-column: 1;
  grid-row: 1 / -1;

  border-right: 1px solid var(--color-slate-200);

  display: none;

  @media ${breaks.AppNavPoint} {
    display: block;
  }

  @media ${breaks.AppMinNavPoint} {
    grid-row: 1;
    border-bottom: 1px solid var(--color-slate-200);
  }
`;

const DrawerButton = styled(IconButton)`
  margin: 1.2rem;
`;

const NavigationDrawer: React.FC<{
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ onClick }) => {
  return (
    <DrawerContainer>
      <DrawerButton onClick={onClick}>
        <Bars3Icon />
      </DrawerButton>
    </DrawerContainer>
  );
};

export default NavigationDrawer;
