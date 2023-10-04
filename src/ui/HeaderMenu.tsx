import styled from "styled-components";
import IconButton from "./IconButton";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Logout from "../features/authentication/Logout";

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

      <Logout />
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
