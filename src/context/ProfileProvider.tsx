import React, { createContext } from "react";
import { Database } from "../services/supabase";
import { useProfile } from "../features/profile/useProfile";

const defaultProfile = {
  created_at: "",
  id: "",
  first_name: "",
  last_name: "",
  avatar: "/default-user.jpg",
};
export const ProfileContext = createContext<{
  isLoading: boolean;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}>({ isLoading: false, profile: defaultProfile });

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoading: isLoadingProfile, profile } = useProfile();

  return (
    <ProfileContext.Provider
      value={{
        isLoading: isLoadingProfile,
        profile: profile || defaultProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
