import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useDarkMode } from "../context/useDarkMode";
import IconButton from "./IconButton";

const DarkModeToggle: React.FC<{ size?: string; $background?: string }> = ({
  size,
  $background,
}) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <IconButton onClick={toggleDarkMode} size={size} $background={$background}>
      {isDarkMode ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
};

export default DarkModeToggle;
