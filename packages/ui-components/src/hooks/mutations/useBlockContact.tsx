import { useMutation, useQueryClient } from "react-query";
import { useApplozicClient } from "../../providers/useApplozicClient";
import { User } from "@applozic/core-sdk";

interface IBlockContact {
  userId: string;
}

function useBlockContact() {
  const { client } = useApplozicClient();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ userId }: IBlockContact) => {
      const response = await client?.contacts.blockUser(userId);
      return response?.response;
    },
    {
      onMutate: async (variables) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(["user", variables.userId, true]);

        // Snapshot the previous value
        const previousUser = queryClient.getQueryData<User>([
          "user",
          variables.userId,
          true,
        ]);

        // Optimistically update to the new value
        if (previousUser) {
          queryClient.setQueryData<User>(
            ["user", variables.userId, true],
            (oldUser) => {
              return oldUser
                ? {
                    ...oldUser,
                    blockedByThis: true,
                  }
                : previousUser;
            }
          );
        }

        // Return a context object with the snapshotted value
        return previousUser;
      },
      onError: (err, variables, context) => {
        console.error("Send Message Error", err);
        queryClient.setQueryData(
          ["user", variables.userId, true],
          (context as any).previousUser
        );
      },
      onSettled: (data, err, variables) => {
        queryClient.invalidateQueries(["user", variables.userId, true]);
      },
    }
  );
}

export default useBlockContact;
