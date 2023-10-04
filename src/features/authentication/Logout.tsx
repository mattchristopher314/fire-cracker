import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

import { useLogout } from "./useLogout";
import IconButton from "../../ui/IconButton";
import MiniSpinner from "../../ui/MiniSpinner";

function Logout() {
  const { logout, isLoggingOut } = useLogout();

  return (
    <IconButton disabled={isLoggingOut} onClick={() => logout()}>
      {!isLoggingOut ? <ArrowRightOnRectangleIcon /> : <MiniSpinner />}
    </IconButton>
  );
}

export default Logout;
