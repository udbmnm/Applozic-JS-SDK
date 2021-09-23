import { useMutation, useQueryClient } from "react-query";
import { useApplozicClient } from "../../providers/useApplozicClient";
import { LoginResult, User } from "@applozic/core-sdk";
import { useToast } from "@chakra-ui/react";
import useGetUserInfo from "../queries/useGetUserInfo";

function useUserLogin() {
  const { client, loginResult } = useApplozicClient();
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation(
    async ({ email, password }: { email: string; password: string }) => {
      return await client?.login(email, password);
    },
    {
      onSuccess: async (data) => {
        console.log({ data });
        if ((data as any) === "INVALID_APPID") {
          queryClient.setQueryData<LoginResult | null>(["self"], null);
          toast({
            title: "Error logging in",
            description: (data as any).toString(),
            status: "error",
          });
        } else if ((data as any) === "INVALID_PASSWORD") {
          queryClient.setQueryData<LoginResult | null>(["self"], null);
          toast({
            title: "Wrong password please try again",
            description: (data as any).toString(),
            status: "error",
          });
        } else {
          if (data) {
            const response = await client?.contacts.getUserDetails([
              data.userId,
            ]);
            const user =
              response && response?.length > 0 ? response[0] : undefined;
            queryClient.setQueryData<User | undefined>(["self"], user);
          }
        }
      },
    }
  );
}

export default useUserLogin;
