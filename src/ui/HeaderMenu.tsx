import styled from "styled-components";
import IconButton from "./IconButton";
import {
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

const HeaderMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <IconButton onClick={() => navigate("/settings")}>
        <Cog6ToothIcon />
      </IconButton>

      <IconButton onClick={() => (window.location.href = "/")}>
        <ArrowRightOnRectangleIcon />
      </IconButton>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
