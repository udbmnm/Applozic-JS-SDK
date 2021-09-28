# Applozic Core JavaScript SDK

## Installation

```bash
$ npm i @applozic/core-sdk
```

## Initialize

### 1. Using npm import

```TypeScript
import ApplozicClient from '@applozic/core-sdk';
const applozicClient = new ApplozicClient('YOUR-APPLOZIC-APP-ID', {
  events: {
    onMessageReceived: ({ message }) => {
      console.log('onMessageReceived', { message });
    },
    onMessageDelivered: ({ message }) => {
      console.log('onMessageDelivered', { message });
    },
    onMessageRead: (contactId, messageKey) => {
      console.log('onMessageRead', { contactId, messageKey });
    },
    onMessageSent: ({ message }) => {
      console.log('onMessageSent', { message });
    },
    onMessageSentUpdate: message => {
      console.log('onMessageSentUpdate', { sentMessageUpdate: message });
    },
    onMessageDeleted:  (contactId, messageKey) => {
      console.log('onMessageDeleted', { contactId, messageKey });
    },
    onConversationRead: userId => {
       console.log('onConversationRead', { userId });
    },

    onConversationDeleted: contactId => {
      console.log('onConversationDeleted', { contactId });
    },

    onUserActivated: message => {
      console.log('onUserActivated', { onUserActivated: message });
    },
    onUserConnect: message => {
      console.log('onUserConnect', { userConnected: message });
    },
    onUserOnlineStatus: (userId, isOnline, timestamp) => {
     console.log('onUserOnlineStatus', { userId, isOnline,  timestamp});
    },
    onTypingStatus: (userId, status) => {
      console.log('onTypingStatus', { userId, status});
    }
  }
});
```

### 2. Using `script` tag

```html
<!DOCTYPE html>
<head>
  <meta charset="utf-8" />
  <title>Development</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <script src="https://websdk.applozic.com/sdk.js"></script>
  <script>
    var applozicClient = new alClient('YOUR-APPLOZIC-APP-ID', {
      events: {
        onMessageReceived: ({ message }) => {
          console.log('onMessageReceived', { message });
        },
        onMessageDelivered: ({ message }) => {
          console.log('onMessageDelivered', { message });
        },
        onMessageRead: (contactId, messageKey) => {
          console.log('onMessageRead', { contactId, messageKey });
        },
        onMessageSent: ({ message }) => {
          console.log('onMessageSent', { message });
        },
        onMessageSentUpdate: message => {
          console.log('onMessageSentUpdate', { sentMessageUpdate: message });
        },
        onMessageDeleted: (contactId, messageKey) => {
          console.log('onMessageDeleted', { contactId, messageKey });
        },
        onConversationRead: userId => {
          console.log('onConversationRead', { userId });
        },
        onConversationDeleted: contactId => {
          console.log('onConversationDeleted', { contactId });
        },
        onUserActivated: message => {
          console.log('onUserActivated', { onUserActivated: message });
        },
        onUserConnect: message => {
          console.log('onUserConnect', { userConnected: message });
        },
        onUserOnlineStatus: (userId, isOnline, timestamp) => {
          console.log('onUserOnlineStatus', { userId, isOnline, timestamp });
        },
        onTypingStatus: (userId, status) => {
          console.log('onTypingStatus', { userId, status });
        }
      }
    });
  </script>
</head>
<html>
  <body>
    <h1>My First Heading</h1>
    <p>My first paragraph.</p>
  </body>
</html>
```

### Login a user

```TypeScript
const loginResult = await applozicClient.login('userId', 'password')
```

### Logout a user

```TypeScript
await applozicClient.logout()
```

### Check if a user was logged in previously

```TypeScript
const isUserLoggedIn = async () => {
  await applozicClient.init();
  if (applozicClient.loginResult) {
    console.log({ loginResult: applozicClient.loginResult });
    return true;
  }
  return false;
}
```

## APIs

Detailed documentation of the APIs can be found in the [Applozic Core SDK](https://websdk.applozic.com/docs/latest).

### [ApplozicClient](https://websdk.applozic.com/docs/latest/classes/ApplozicClient.html)

- [init](https://websdk.applozic.com/docs/latest/classes/ApplozicClient.html#init)
- [login](https://websdk.applozic.com/docs/latest/interfaces/LoginApi.html)
- [logout](https://websdk.applozic.com/docs/latest/classes/ApplozicClient.html#logout)
- [sendTypingStatus](https://websdk.applozic.com/docs/latest/classes/ApplozicClient.html#sendTypingStatus)

### [ContactsApi](https://websdk.applozic.com/docs/latest/interfaces/ContactsApi.html)

- [blockListSync](https://websdk.applozic.com/docs/latest/interfaces/ContactsApi.html#blockListSync)
- [blockUser](https://websdk.applozic.com/docs/latest/interfaces/ContactsApi.html#blockUser)
- [getContactList](https://websdk.applozic.com/docs/latest/interfaces/ContactsApi.html#getContactList)
- [getUserDetails](https://websdk.applozic.com/docs/latest/interfaces/ContactsApi.html#getUserDetails)
- [unblockUser](https://websdk.applozic.com/docs/latest/interfaces/ContactsApi.html#unblockUser)
- [updateUserDetails](https://websdk.applozic.com/docs/latest/interfaces/ContactsApi.html#updateUserDetails)
- [updateUserPassword](https://websdk.applozic.com/docs/latest/interfaces/ContactsApi.html#updateUserPassword)

### [FilesApi](https://websdk.applozic.com/docs/latest/interfaces/FilesApi.html)

- [upload](https://websdk.applozic.com/docs/latest/interfaces/FilesApi.html#upload)

### [GroupsApi](https://websdk.applozic.com/docs/latest/interfaces/GroupsApi.html)

- [addUserToGroup](https://websdk.applozic.com/docs/latest/interfaces/GroupsApi.html#addUserToGroup)
- [addUsersToGroups](https://websdk.applozic.com/docs/latest/interfaces/GroupsApi.html#addUsersToGroups)
- [createGroup](https://websdk.applozic.com/docs/latest/interfaces/GroupsApi.html#createGroup)
- [createOpenFriendList](https://websdk.applozic.com/docs/latest/interfaces/GroupsApi.html#createOpenFriendList)
- [createUserFriendList](https://websdk.applozic.com/docs/latest/interfaces/GroupsApi.html#createUserFriendList)
- [deleteFriendList](https://websdk.applozic.com/docs/latest/interfaces/GroupsApi.html#deleteFriendList)
- [deleteGroup](https://websdk.applozic.com/docs/latest/interfaces/GroupsApi.html#deleteGroup)
- [deleteGroups](https://websdk.applozic.com/docs/latest/interfaces/GroupsApi.html#deleteGroups)
- [getFriendList](https://websdk.applozic.com/docs/latest/interfaces/GroupsApi.html#getFriendList)
- [groupInfo](https://websdk.applozic.com/docs/latest/interfaces/GroupsApi.html#groupInfo)
- [isUserPresent](https://websdk.applozic.com/docs/latest/interfaces/GroupsApi.html#isUserPresent)
- [leaveGroup](https://websdk.applozic.com/docs/latest/interfaces/GroupsApi.html#leaveGroup)
- [openGroup](https://websdk.applozic.com/docs/latest/interfaces/GroupsApi.html#openGroup)
- [removeFromFriendList](https://websdk.applozic.com/docs/latest/interfaces/GroupsApi.html#removeFromFriendList)
- [removeUserFromAllGroups](https://websdk.applozic.com/docs/latest/interfaces/GroupsApi.html#removeUserFromAllGroups)
- [removeUserFromGroup](https://websdk.applozic.com/docs/latest/interfaces/GroupsApi.html#removeUserFromGroup)
- [removeUsersFromGroups](https://websdk.applozic.com/docs/latest/interfaces/GroupsApi.html#removeUsersFromGroups)
- [updateGroupInfo](https://websdk.applozic.com/docs/latest/interfaces/GroupsApi.html#updateGroupInfo)
- [updateUserDetails](https://websdk.applozic.com/docs/latest/interfaces/GroupsApi.html#updateUserDetails)
- [userCount](https://websdk.applozic.com/docs/latest/interfaces/GroupsApi.html#userCount)
- [userGroupList](https://websdk.applozic.com/docs/latest/interfaces/GroupsApi.html#userGroupList)

### [MessagesApi](https://websdk.applozic.com/docs/latest/interfaces/MessagesApi.html)

- [delete](https://websdk.applozic.com/docs/latest/interfaces/MessagesApi.html#delete)
- [deleteAll](https://websdk.applozic.com/docs/latest/interfaces/MessagesApi.html#deleteAll)
- [deleteConversation](https://websdk.applozic.com/docs/latest/interfaces/MessagesApi.html#deleteConversation)
- [deleteOlderThan](https://websdk.applozic.com/docs/latest/interfaces/MessagesApi.html#deleteOlderThan)
- [list](https://websdk.applozic.com/docs/latest/interfaces/MessagesApi.html#list)
- [send](https://websdk.applozic.com/docs/latest/interfaces/MessagesApi.html#send)
