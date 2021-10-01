# Applozic UI Components JavaScript SDK

## Installation

```bash
$ npm i @applozic/ui-components
```

## Importing (using npm import)

```TypeScript
import { FullView } from '@applozic/ui-components';
```

## Views

### Full View
This is a full fleged implementation of the @applozic/core package with best practices.
The UI supports both light and dark theme.

It has the following features implemented.
1. Login
2. Feature Sidebar 
   1. Active Chats
   2. Contacts
   3. Groups
3. Sidebar with search and latest message
4. Chat window
   1. Send Message
      1. Send Attachment
      2. Send Audio message
   2. View chats
      1. Pagination.
      2. Delete chat.
      3. Update chat status.
   3. User Presence
      1. User Online
      2. User Last Seen timestamp
5. Chat details
   1. Contact
      1. View details
      2. Clear Chat
      3. View all media
   2. Group
      1. View Details
      2. Edit Details
      3. Clear Chat
      4. View all media
      5. Add new members
      6. Delete group {for admins}
      7. Leave group
6. User details
   1. Update details
   2. Logout


```TypeScript
function App() {
  return (
    <FullView
      initialColorMode={"light"|"dark"}
      useSystemColorMode={'true/false'}
      applicationId={'YOUR-APPLOZIC-APP-ID'}
      giphyApiKey={'YOUR-GIPHY-API-KEY'}
      gMapsApiKey={'YOUR-GOOGLE-MAPS-API-KEY'}
      loginPage={{
        topHeader: 'Brand Name',
        topSubHeader: 'Welcome Message'
      }}
    />
  );
}
```