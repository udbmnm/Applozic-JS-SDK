import { useMutation, useQueryClient } from 'react-query';
import { useApplozicClient } from '../../providers/useApplozicClient';
import { useToast } from '@chakra-ui/react';

function useUserLogin() {
  const { client, loginResult } = useApplozicClient();
  const queryClient = useQueryClient();
  const toast = useToast();
  
  const showLoginErrorToast = (title: string, description: string) => {
    queryClient.setQueryData(['self', loginResult?.userId], null);
    toast({
      title,
      description,
      status: 'error'
    });
  };

  return useMutation(
    async ({ email, password }: { email: string; password: string }) =>
      client?.login(email, password),
    {
      onSuccess: async data => {
        if ((data as any) === 'INVALID_APPID') {
          showLoginErrorToast('Error logging in', (data as any).toString());
        } else if ((data as any) === 'INVALID_PASSWORD') {
          showLoginErrorToast(
            'Wrong password please try again',
            (data as any).toString()
          );
        } else {
          if (data) {
            const response = await client?.contacts.getUserDetails([
              data.userId
            ]);
            const user =
              response && response?.length > 0 ? response[0] : undefined;
            queryClient.setQueryData(['self', loginResult?.userId], user);
          }
        }
      },
      onError: (error: Error) => {
        if (error.message === 'Invalid password') {
          showLoginErrorToast('Wrong password please try again', error.message);
        }
        showLoginErrorToast('Error logging in', error.message);
      }
    }
  );
}

export default useUserLogin;
