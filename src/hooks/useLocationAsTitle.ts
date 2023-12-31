import { useLocation } from "react-router-dom";

const FormatAsTitle = (title: string): string => {
  return title
    .split(" ")
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(" ");
};

export const useLocationAsTitle = (): string => {
  const location = useLocation();

  let locationName: string = location.pathname
    .replace("/", "")
    .replace("-", " ");
  locationName = FormatAsTitle(locationName);

  return locationName;
};
