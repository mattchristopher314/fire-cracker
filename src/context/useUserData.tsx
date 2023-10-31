import { useContext } from "react";
import { UserContext } from "./UserProvider";

export const useUserData = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("User context was used outside of the provider.");

  return context;
};
