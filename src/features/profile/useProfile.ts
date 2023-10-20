import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/apiProfile";
import { useUser } from "../authentication/useUser";

export function useProfile() {
  const { user } = useUser();

  const { isLoading, data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(user?.id || ""),
  });

  return { isLoading, profile };
}
