import React, { createContext } from "react";
import { User } from "@supabase/supabase-js";
import { useUser } from "../features/authentication/useUser";

export const UserContext = createContext<{
  isLoading: boolean;
  user: User | null;
  isAuthenticated: boolean;
}>({ isLoading: false, user: null, isAuthenticated: false });

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoading: isLoadingUser, user } = useUser();

  return (
    <UserContext.Provider
      value={{
        isLoading: isLoadingUser,
        user: user || null,
        isAuthenticated: user?.role === "authenticated",
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
