import { useMutation, useQueryClient } from 'react-query';
import { useApplozicClient } from '../../providers/useApplozicClient';

interface IClearContact {
  userId: string;
}

interface IClearGroup {
  groupId: string;
}

function useClearChat() {
  const { client } = useApplozicClient();
  const queryClient = useQueryClient();
  return useMutation(
    async (options: IClearContact | IClearGroup) => {
      const response = await client?.messages.deleteConversation(options);
      return response;
    },
    {
      onMutate: options => {
        queryClient.cancelQueries([
          'messages',
          (options as IClearContact)?.userId ??
            (options as IClearGroup)?.groupId
        ]);
        queryClient.setQueryData(
          [
            'messages-local',
            (options as IClearContact)?.userId ??
              (options as IClearGroup)?.groupId
          ],
          []
        );
      }
    }
  );
}

export default useClearChat;
