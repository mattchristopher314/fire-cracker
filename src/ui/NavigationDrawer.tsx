import { Bars3Icon } from "@heroicons/react/24/outline";
import IconButton from "./IconButton";
import styled from "styled-components";
import { breaks } from "../styles/GlobalStyles";

const DrawerContainer = styled.div`
  grid-column: 1;
  grid-row: 1 / -1;

  border-right: 1px solid var(--color-slate-200);

  display: none;

  & svg {
    width: 3.2rem;
    height: 3.2rem;
  }

  @media ${breaks.AppNavPoint} {
    display: block;
  }

  @media ${breaks.AppMinNavPoint} {
    grid-row: 1;
    border-bottom: 1px solid var(--color-slate-200);
  }
`;

const DrawerButton = styled(IconButton)`
  margin: 0.8rem 0.4rem;
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
