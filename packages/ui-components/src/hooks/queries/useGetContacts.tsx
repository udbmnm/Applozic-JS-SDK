import { useInfiniteQuery, useQueryClient } from "react-query";
import { Group, User } from "@applozic/core-sdk";
import { useApplozicClient } from "../../providers/useApplozicClient";

const mergeUsers = (users: User[], newUsers: User[]) => {
  const usersMap = new Map(users.map((user) => [user.userId, user]));
  newUsers.forEach((newUser) => {
    usersMap.set(newUser.userId, newUser);
  });
  return Array.from(usersMap.values());
};

const mergeGroups = (groups: Group[], newGroups: Group[]) => {
  const groupsMap = new Map(
    groups.map((group) => [group.clientGroupId, group])
  );
  newGroups.forEach((newGroup) => {
    groupsMap.set(newGroup.clientGroupId, newGroup);
  });
  return Array.from(groupsMap.values());
};

function useGetUserContacts() {
  const { client } = useApplozicClient();
  const queryClient = useQueryClient();
  return useInfiniteQuery(
    ["contacts"],
    async ({ pageParam = Date.now() }) => {
      const response = await client?.contacts.getContactList(pageParam);
      response?.groups?.forEach((group) => {
        queryClient.setQueryData(["group", group.clientGroupId], group);
      });
      response?.users?.forEach((user) => {
        queryClient.setQueryData(["user", user.userId], user);
      });

      let users = response?.users ?? [];
      let groups = response?.groups ?? [];

      const currentRecent = queryClient.getQueryData<{
        users: User[];
        groups: Group[];
      }>(["contacts-local"]) ?? { users: [], groups: [] };

      queryClient.setQueryData<{
        users: User[];
        groups: Group[];
      }>(["contacts-local"], {
        users: mergeUsers(currentRecent.users, users),
        groups: mergeGroups(currentRecent.groups, groups),
      });

      return {
        users: users,
        groups: groups,
        hasNext: !(
          response?.users.length == 0 && response?.groups.length === 0
        ),
        nextCursor: response?.lastFetchTime,
      };
    },
    {
      getNextPageParam: ({ hasNext, nextCursor }) =>
        hasNext ? nextCursor : undefined,
    }
  );
}

export default useGetUserContacts;
