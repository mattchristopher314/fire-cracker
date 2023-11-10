import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserData } from "../../context/useUserData";
import { updateProfileSettings } from "../../services/apiSettings";
import { Database } from "../../services/supabase";

export const useUpdateProfileSettings = <T extends readonly string[]>(
  settingsToUpdate: [...T]
) => {
  const { user } = useUserData();
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation<
    | {
        [Key in T[number]]:
          | Database["public"]["Tables"]["settings"]["Row"]
          | undefined;
      }
    | null,
    unknown,
    { [Key in T[number]]: string | undefined },
    unknown
  >({
    mutationFn: (data) =>
      updateProfileSettings({ updates: data, settingsToUpdate }),
    onSuccess: (data) => {
      if (data) {
        queryClient.setQueryData(
          ["settings", user?.id, settingsToUpdate],
          settingsToUpdate.reduce((obj, key) => {
            return {
              ...obj,
              [key]: data[key]?.payload || undefined,
            };
          }, {}) as { [Key in T[number]]: string | undefined }
        );
      }
    },
  });

  return updateProfileMutation;
};
