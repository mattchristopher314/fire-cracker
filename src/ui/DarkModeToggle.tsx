import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useDarkMode } from "../context/useDarkMode";
import IconButton from "./IconButton";

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <IconButton onClick={toggleDarkMode}>
      {isDarkMode ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
};

export default DarkModeToggle;
