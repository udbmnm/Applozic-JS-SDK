import { useMutation, useQueryClient } from 'react-query';
import { useApplozicClient } from '../../providers/useApplozicClient';

function useUserLogout() {
  const { client, loginResult } = useApplozicClient();
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      if (loginResult?.userId) {
        await client?.logout();
      }
    },
    {
      onSuccess: () => {
        queryClient.setQueryData(['self', loginResult?.userId], null);
        queryClient.clear();
      }
    }
  );
}

export default useUserLogout;
