import { useMutation, useQueryClient } from 'react-query';
import { useApplozicClient } from '../../providers/useApplozicClient';

interface IBlockContact {
  userId: string;
}

interface IBlockGroup {
  groupId: string;
}

function useClearChat() {
  const { client } = useApplozicClient();
  const queryClient = useQueryClient();
  return useMutation(
    async (options: IBlockContact | IBlockGroup) => {
      const response = await client?.messages.deleteConversation(options);
      return response;
    },
    {
      onMutate: options => {
        queryClient.cancelQueries([
          'messages',
          (options as IBlockContact)?.userId ??
            (options as IBlockGroup)?.groupId
        ]);
        queryClient.setQueryData(
          [
            'messages-local',
            (options as IBlockContact)?.userId ??
              (options as IBlockGroup)?.groupId
          ],
          []
        );
      }
    }
  );
}

export default useClearChat;
