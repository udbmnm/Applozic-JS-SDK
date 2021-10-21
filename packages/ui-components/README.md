# Applozic UI Components JavaScript SDK

## Installation

```bash
$ npm i @applozic/ui-components
```


## Views

### FullView
This is a full fleged implementation of the @applozic/core package with best practices.
The UI supports both light and dark theme depending on the `colorMode` prop provided to the view.

You can test out the live version with the [interactive storybook](https://ui-storybook.applozic.com/?path=/docs/views-fullview--default)

It has the following features implemented.
1. Login
2. Feature Tabs 
   1. Recent Chats
   2. Contacts
   3. Groups
3. Sidebar with search and tab specific entities
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


#### Example
```TypeScript
import { FullView } from '@applozic/ui-components';

function App() {
  return (
    <FullView
      colorMode={'light'}
      useSystemColorMode={false}
      environment={'production'}
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

##### Customization

| Property           | Type                         | Description                                                                                                                                   |
| ------------------ | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| colorMode          | `'light'|'dark'`             | Set the default theme of the UI components                                                                                                    |
| useSystemColorMode | `boolean`                    | Use the users system level theme to decide if the UI components should be `light`or `dark`                                                    |
| environment        | `'development'|'production'` | The envrionment in which to initialize the UI, hides the [react query devtools](https://react-query.tanstack.com/devtools) in production mode |
| applicationId      | `string`                     | The Applozic Application ID as provided after onboarding                                                                                      |
| giphyApiKey        | `string`                     | GIPHY API Key to enable sending GIFs                                                                                                          |
| gMapsApiKey        | `string`                     | Google Maps API Key to enable sending Geo Location                                                                                            |

## Components
### FeatureTabs
The component to handle the side/bottom tabs and control the active sidebar component. This also gives the developer control over which features should be accessible to the logged in user.
You can test out the live version with the [interactive storybook](https://ui-storybook.applozic.com/?path=/docs/components-featuretabs--default)


#### Usage
The below `enum` will be needed to initialize and maintain your own implementation of `FeatureTabs`.

##### `enum` FeatureTab
These are the currently available options for the feature tabs. This will be useful to define the `Sidebar` component.
| Feature Name              | Description                                                      |
| ------------------------- | ---------------------------------------------------------------- |
| `FeatureTab.USER`         | The logged in user's details and other options                   |
| `FeatureTab.RECENT_CHATS` | The most recent chats of the logged in user with users or groups |
| `FeatureTab.GROUPS`       | All the groups the logged in  user is a part of or has created   |
| `FeatureTab.CONTACTS`     | All the users with which the logged in user is in contact with   |


###### Example
```TypeScript
import { useState } from 'react';
import { FeatureTabs, FeatureTab } from '@applozic/ui-components';

function App() {
   const [activeTab, setActiveTab] = useState<FeatureTab>()
   // the value `activeTab` can be used to initialize the `Sidebar` component or handle other custom logic
   const ActiveFeatures = [
    FeatureTab.USER,
    FeatureTab.RECENT_CHATS,
    FeatureTab.CONTACTS,
    FeatureTab.GROUPS
   ];
   return (
      <FeatureTabs
         featureTabs={ActiveFeatures}
         onChange={index => setActiveTab(ActiveFeatures[index])}
         userName={'John Doe'}
         userImageUrl={'https://link_to_image.com'| undefined}
      />
   );
}
```

##### Customization

| Property     | Type                      | Description                                                                                  |
| ------------ | ------------------------- | -------------------------------------------------------------------------------------------- |
| featureTabs  | `Array<FeatureTab>`       | List of Features to enable this decides which of the sidebars will be accessible by the user |
| featureTabs  | `Array<FeatureTab>`       | List of Features to enable this decides which of the sidebars will be accessible by the user |
| onChange     | `(index: number) => void` | Callback to handle the change of index in the tabs                                           |
| userName     | `string`                  | the name of the logged in use to show in the tabs                                            |
| userImageUrl | optional - `string`       | the image url of the logged in user to show in the tabs                                      |


### Sidebar
Build your custom implementation of the sidebar UI as shown in the [interactive storybook](https://ui-storybook.applozic.com/?path=/docs/components-sidebar--default)


#### Usage
The below `interface(s)` and `enum` will be needed to initialize and maintain your own implementation of the `Sidebar`.


##### `enum` ChatType
The type of chats available 
| Chat Type        | Description              |
| ---------------- | ------------------------ |
| `ChatType.USER`  | Chat with a user contact |
| `ChatType.GROUP` | Chat with a group        |


##### `interface` RecentChat
Defines an item in the sidebar
| Variable        | Type              | Description                                                                                                                    |
| --------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| contactId       | `string`          | The unique identifier for the contact **`user.userId`** for `ChatType.USER` and **`group.clientGroupId`** for `ChatType.GROUP` |
| chatType        | `ChatType`        | The enum value defining the type of chat                                                                                       |
| imageUrl        | optional `string` | The image URL for the specific chat                                                                                            |
| lastMessageKey  | `string`          | The unique identifier for the last message in this chat                                                                        |
| lastMessageTime | `number`          | The numeric timestamp of the last message in this chat                                                                         |

##### `interface` [User](https://websdk.applozic.com/docs/latest/interfaces/User.html)
Can be imported from to the `@applozic/core-sdk` 

##### `interface` [Group](https://websdk.applozic.com/docs/latest/interfaces/Group.html)
Can be imported from to the `@applozic/core-sdk` 

##### Example

```Typescript
import { useState } from 'react';
import { Sidebar, RecentChat, ChatType } from '@applozic/ui-components';
import { User, Group } from '@applozic/core';

function App() {
   const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
   const [searchQuery, setSearchQuery] = useState<string>();
   return(
      <Sidebar
         selectedFeatureTab={activeTab}
         isCollapsed={sidebarCollapsed}
         recentChats={recentChats}
         users={users}
         search={{
            searchValue: searchQuery,
            setSearchValue: setSearchQuery,
            setCollapsed: setSidebarCollapsed,
            isCollapsed: sidebarCollapsed
         }}
         isFetchingNextRecentChatsPage={'true|false'}
         fetchNextRecentChats={() => 
         // fetch next page of `RecentChat`
         }
         selfDetails={{
            name: "John Doe",
            imageUrl: "https://link-to-image.com",
            onCloseClicked: () => {
               // handle self detail panel close
            },
            onLogOutClicked: () =>{
               // handle user logout
            },
            onUpdateValue: (key, value) => {
               // handle user update
            }
         }}
         handleItemClick={(type, contactId) => {
            // Set the active chat and other logic
         }}
         onCreateGroup={async (newGroup: INewGroup) => {
            // handle create group promise
         }}
         onClearConversation={(chatType, contactId) => {
            // handle create group promise      
         }}
    />)
}
```

##### Customization
###### SearchProps
| Property       | Type                       | Description                                                       |
| -------------- | -------------------------- | ----------------------------------------------------------------- |
| searchValue    | `string | undefined`       | Search query to filter the sidebar items                          |
| setSearchValue | `(query: string) => void`  | Callback to update the search query                               |
| isCollapsed    | `boolean`                  | The current collapsed state of the sidebar                        |
| setCollapsed   | `(state: boolean) => void` | Callback to toggle the collapsed or expanded state of the sidebar |

###### SelfDetailProps
| Property        | Type                                                                             | Description                                                                        |
| --------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| name            | `string`                                                                         | name of logged in user                                                             |
| imageUrl        | `string | undefined`                                                             | image url of the logged in user                                                    |
| metaProps       | `{ items:[{header: string, text:string}]                          } | undefined` | a list of ChatDetail metadata like email, phone number                             |
| onCloseClicked  | `() => void | Promise<void>`                                                     | Callback to handle the close action                                                |
| onLogOutClicked | `() => void | Promise<void>`                                                     | Callback to handle the logout action                                               |
| onUpdateValue   | `(key: string, value: string | undefined ) => void | Promise<void>`              | Callback to handle update of any of the properties of the user eg: name, image etc |

###### SidebarProps
| Property                      | Type                                                                                      | Description                                                                              |
| ----------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| selectedFeatureTab            | `FeatureTab`                                                                              | currently selected `FeatureTab` to decide the type of sidebar to show                    |
| search                        | `SearchProps`                                                                             | Properties to handle the search action                                                   |
| selfDetails                   | `SelfDetailProps`                                                                         | Properties to handle the logged in user's detail page                                    |
| recentChats                   | `RecentChat[] | undefined`                                                                | List of `RecentChat` items                                                               |
| users                         | `User[] | undefined`                                                                      | List of all the users which are the logged in user's contact list                        |
| isCollapsed                   | `boolean`                                                                                 | `true` if the sidebar is in collapsed state                                              |
| onCreateGroup                 | `(newGroup: INewGroup) => void | Promise<void>`                                           | Callback to handle group creation                                                        |
| onClearConversation           | `(chatType: ChatType, contactId: string) => void | Promise<void>`                         | Callback to handle clearing a given conversation                                         |
| handleItemClick               | `(type: ChatType, contactId: string) => void | Promise<void>`                             | Callback to handle item click                                                            |
| fetchNextRecentChats          | `() => void | Promise<void>`                                                              | Callback to handle fetching more contacts when the bottom of a long list comes into view |
| isFetchingNextRecentChatsPage | `boolean`                                                                                 | `true` if next page of the recent chats is being fetched                                 |
| onCreateContact               | `(contactName: string) => void                                     | Promise<void>      ` | ***Optional :*** Callback to handle creation of new contact                              |



### ChatPanel

#### Usage


### ChatDetails

#### Usage