import { useQuery } from "@tanstack/react-query";
import { useUserData } from "../../context/useUserData";
import { getProfileSettings } from "../../services/apiSettings";

export function useProfileSettings<T extends readonly string[]>(
  settingsToFetch: [...T]
) {
  const { user } = useUserData();

  const { isLoading, data: settings } = useQuery({
    queryKey: ["profile", user?.id, settingsToFetch],
    queryFn: () => getProfileSettings(user?.id || "", settingsToFetch),
  });

  return { isLoading, settings };
}
