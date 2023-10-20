import { useContext } from "react";
import { ProfileContext } from "./ProfileProvider";

export const useProfileData = () => {
  const context = useContext(ProfileContext);
  if (context === undefined)
    throw new Error("Profile context was used outside of the provider.");

  return context;
};
