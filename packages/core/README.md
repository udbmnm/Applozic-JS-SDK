# Applozic Core JavaScript SDK

## Installation

```bash
$ npm i @applozic/core-sdk
```

## Importing (using npm import)

```TypeScript
import ApplozicClient from '@applozic/core-sdk';
```

## Usage

```TypeScript
const client = new ApplozicClient('YOUR-APPLOZIC-APP-ID', {
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

## APIs

### Login a user

```TypeScript
client.login('email@id.com', 'user-password');
```

### List most recent message of all conversations

```TypeScript
const response = await client.messages.list({
  mainPageSize: 50, // Number of conversations to load
  endTime: TIME_STAMP_OF_FIRST_MESSAGE_IN_PREVIOUS_CALL_IF_ANY, // optional this is used for paginated response
});
```

### List most recent message of a user

```TypeScript
const response = await client.messages.list({
  userId: 'userId of contact',
  pageSize: 50,
  endTime: TIME_STAMP_OF_FIRST_MESSAGE_IN_PREVIOUS_CALL_IF_ANY, // optional this is used for paginated response
});
```

### List most recent message of a group

```TypeScript
const response = await client.messages.list({
  groupId: 'groupId of group',
  pageSize: 50,
  endTime: TIME_STAMP_OF_FIRST_MESSAGE_IN_PREVIOUS_CALL_IF_ANY, // optional this is used for paginated response
});
```

```TypeScript
const response = await client.messages.list({
  mainPageSize: 50, // Number of conversations to load
  pageSize: 50,
  endTime: TIME_STAMP_OF_FIRST_MESSAGE_IN_PREVIOUS_CALL_IF_ANY, // optional this is used for paginated response
});
```

```TypeScript
const result = await client.messages.send({
  to: 'user id of contact',
  message: 'your message content'
});
```

### Send Message to User

```TypeScript
const result = await client.messages.send({
  to: 'user id of contact',
  message: 'your message content'
});
```

### Send Message to Group

```TypeScript
const result = await client.messages.send({
  clientGroupId: 'groupId of the group',
  message: 'your message content'
});
```

### Add attachment to messages

```TypeScript
const file = new File(); // Dummy code, use file picker to get a file object
const fileResult = await client.files.upload(file);

const result = await client.messages.send({
  clientGroupId: 'groupId of the group',
  message: 'your message content',
  fileMeta: fileResult
});
```

### Delete a message

```TypeScript
const deleteMessageForAll = true;

const deleteOnlyForCurrentUser = false;

const result = await client.messages.delete('MESSAGE_KEY', shouldDeleteMessageForAll);

// or

const result = await client.messages.delete('MESSAGE_KEY', deleteOnlyForCurrentUser);
```

### Delete conversation

```TypeScript
const result = await client.messages.deleteConversation({
  userId: 'userId of contact',
});

const result = await client.messages.deleteConversation({
  groupId: 'groupId of group',
});
```


## Groups

### Create group

```TypeScript
const result = await client.groups.create({
  groupName: 'group name',
  groupImage: 'group image url',
  groupMembers: ['userId of contact', 'userId of contact'],
});
```

### Add user to group

```TypeScript
const result = await client.groups.addUserToGroup({
  userId: 'userId of contact',
  clientGroupId: 'groupId of group',
  role: 1, // 1 = ADMIN, 2 = MODERATOTR, 3 = MEMBER
});
```


### Remove group member

```TypeScript
const result = await client.groups.removeUserFromGroup({
  userId: 'userId of contact',
  clientGroupId: 'groupId of group',
});
```

### Leave group

```TypeScript
const result = await client.groups.leaveGroup({
  clientGroupId: 'groupId of group to leave',
});
```

### Delete group

```TypeScript
const result = await client.groups.deleteGroup({
  clientGroupId: 'groupId of group to delete',
});
```


### Send typing status to a contact

```TypeScript
client.sendTypingStatus('userId', 1); // 1 = typing, 0 = not typing
```