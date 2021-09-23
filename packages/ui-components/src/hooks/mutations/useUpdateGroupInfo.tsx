import { useMutation, useQueryClient } from "react-query";
import { ChatType } from "../../models/chat";
import { useApplozicClient } from "../../providers/useApplozicClient";
import { IUpdateGroupDetailsRequest, Group } from "@applozic/core-sdk";

function useUpdateGroupInfo() {
  const { client, loginResult } = useApplozicClient();
  const queryClient = useQueryClient();
  return useMutation(
    async (updateReq: IUpdateGroupDetailsRequest) => {
      if (loginResult?.userId) {
        const response = await client?.groups.updateGroupInfo(updateReq);
        return response?.response;
      }
    },
    {
      // Always refetch after error or success:
      onSettled: (data, response, updateReq) => {
        queryClient.setQueryData<Group | undefined>(
          ["group", updateReq?.clientGroupId, true],
          (oldGroup) => {
            if (oldGroup) {
              return {
                ...oldGroup,
                name: updateReq.newName ?? oldGroup.name,
                imageUrl: updateReq.imageUrl ?? oldGroup.imageUrl,
              };
            } else {
              return undefined;
            }
          }
        );
      },
    }
  );
}

export default useUpdateGroupInfo;
