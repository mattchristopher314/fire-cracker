import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/apiProfile";
import { useUserData } from "../../context/useUserData";

export function useProfile() {
  const { user } = useUserData();

  const { isLoading, data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => getProfile(user?.id || ""),
  });

  return { isLoading, profile };
}
