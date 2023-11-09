import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";

export const useDarkMode: () => {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
} = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("Dark mode context was used outside of the provider.");

  return context;
};
