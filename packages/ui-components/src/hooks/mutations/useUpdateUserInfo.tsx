import { useMutation, useQueryClient } from "react-query";
import { useApplozicClient } from "../../providers/useApplozicClient";
import { UpdateUserDetailsReq, User } from "@applozic/core-sdk";

function useUpdateSelfInfo() {
  const { client, loginResult } = useApplozicClient();
  const queryClient = useQueryClient();
  return useMutation(
    async (updateReq: UpdateUserDetailsReq) => {
      if (loginResult?.userId) {
        const response = await client?.contacts.updateUserDetails(updateReq);
        return response?.response;
      }
    },
    {
      // Always refetch after error or success:
      onSettled: (data, response, updateReq) => {
        queryClient.setQueryData<User | undefined>(["self"], (oldSelf) => {
          if (oldSelf) {
            return {
              ...oldSelf,
              ...updateReq,
            };
          } else {
            return undefined;
          }
        });
      },
    }
  );
}

export default useUpdateSelfInfo;
