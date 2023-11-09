import { createContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const DarkModeContext = createContext<{
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}>({ isDarkMode: false, toggleDarkMode: () => {} });

const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode"
  );

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );

  const toggleDarkMode = () => {
    setIsDarkMode((cur) => !cur);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
