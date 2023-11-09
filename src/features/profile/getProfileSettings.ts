import { Database, SettingsJSONData } from "../../services/supabase";

export const getProfileSettings: (
  profile: Database["public"]["Tables"]["profiles"]["Row"]
) => SettingsJSONData = (userProfile) => {
  if (userProfile.settings && typeof userProfile.settings === "object") {
    if (!Array.isArray(userProfile.settings)) {
      const profileSettings = userProfile.settings;

      return { income: Number(profileSettings["income"]) || 0 };
    }
  }

  return { income: 0 };
};
