// import * as fs from 'fs';
// import ApplozicClient from '..';
import ApplozicClient from '../';
const APPLICATION_ID = 'applozic-sample-app';

const applozicClient = new ApplozicClient(APPLICATION_ID, {
  useSocket: false,
  useStore: false
});

(window as any).alClient = applozicClient;

const main = async () => {
  try {
    const response = await applozicClient.login(
      'some-email@applozic.com',
      'testing'
    );
    console.log('Auth Token', response.authToken);
    console.log('Token', response.token);
    console.log('device', response.deviceKey);

    // const getContactListResult = await applozicClient.contacts.getContactList();
    // console.log(
    //   '\n\n\nFINAL RESULT\n\n',
    //   JSON.stringify(getContactListResult, null, 2)
    // );

    // const blockList = await applozicClient.contacts.updateUserPassword('testing1', 'testing');
    // console.log({ blockList });
    // fs.writeFileSync('sample.json', JSON.stringify(getContactListResult));

    // const uploadResponse = await applozicClient.files.upload();
    // console.log('uploadResponse', uploadResponse);

    // const userDetails = await applozicClient.contacts.getUserDetails([
    //   'some-email-2@applozic.com'
    // ]);
    // console.log('userDetails', userDetails);

    // console.log(userDetails.response);
    // const updateResponse = await applozicClient.contacts.updateUserDetails({
    //   displayName: 'XYZ'
    // });

    // const passwordResposne = await applozicClient.contacts.updateUserPassword(
    //   'example-password',
    //   'example-password-2'
    // );
    // console.log(passwordResposne);

    // const blockUser = await applozicClient.contacts.blockUser('some-email@applozic.com');
    // console.log(blockUser);

    // const blockListSync = await applozicClient.contacts.blockListSync(
    //   Date.now()
    // );
    // console.log(blockListSync);

    // const unblockUser = await applozicClient.contacts.unblockUser(
    //   'some-email@applozic.com'
    // );
    // console.log(unblockUser);

    // const sendButtons = await applozicClient.messages.sendButtons({
    //   to: 'some-email-12@applozic.com',
    //   metadata: {
    //     payload: [
    //       {
    //         name: 'Pay',
    //         replyText:
    //           'optional, will be used as acknowledgement message to user in case of requestType JSON. Default value is same as name parameter'
    //       }
    //     ],
    //     formData: { amount: '1000', description: 'movie ticket' },
    //     formAction: 'https://example.com/book',
    //     requestType: 'json'
    //   }
    // });
    // console.log('Message key:', sendButtons);

    // const sendImageCaption = await applozicClient.messages.sendImageWithCaption(
    //   {
    //     to: 'some-email-12@applozic.com',
    //     metadata: {
    //       payload: [
    //         {
    //           url:
    //             'https://m.media-amazon.com/images/M/MV5BNTliYjlkNDQtMjFlNS00NjgzLWFmMWEtYmM2Mzc2Zjg3ZjEyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg',
    //           caption: 'This is the caption'
    //         }
    //       ]
    //     }
    //   }
    // );
    // console.log('Message key:', sendImageCaption);

    // const sendList = await applozicClient.messages.sendList({
    //   to: 'some-email-12@applozic.com',
    //   metadata: {
    //     payload: {
    //       headerImgSrc:
    //         'https://cdn.shopify.com/s/files/1/0326/7189/t/65/assets/pf-e820b2e0--mother-tree-forest_500x.jpg?v=1619557558',
    //       headerText: 'Header text.',
    //       elements: [
    //         {
    //           imgSrc: 'https://bit.ly/dan-abramov',
    //           title: 'List item 1',
    //           description: 'Description for the list item',
    //           action: {
    //             url: 'https://www.google.com',
    //             type: 'link'
    //           }
    //         }
    //       ],
    //       buttons: [
    //         {
    //           name: 'See us on facebook',
    //           action: {
    //             url: 'https://www.facebook.com',
    //             type: 'link'
    //           }
    //         }
    //       ]
    //     }
    //   }
    // });
    // console.log('Message key:', sendList);
    // const sendCard = await applozicClient.messages.sendCards({
    //   to: 'some-email-12@applozic.com',
    //   metadata: {
    //     payload: [
    //       {
    //         title: 'Card Title',
    //         subtitle: 'Card Subtitle ',
    //         header: {
    //           overlayText: 'Overlay Text',
    //           imgSrc: 'https://cdn.shopify.com/s/files/1/0326/7189/t/65/assets/pf-e820b2e0--mother-tree-forest_500x.jpg?v=1619557558'
    //         },
    //         description:
    //           'This is a sample description of the card. It is for sampling purposes.',
    //         titleExt: 'title extension',
    //         buttons: [
    //           {
    //             name: 'Open Facebook',
    //             action: {
    //               type: 'link',
    //               payload: {
    //                 url: 'https://www.facebook.com'
    //               }
    //             }
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // });
    // console.log('Message key:', sendCard);

    const sendCards = await applozicClient.messages.sendCards({
      to: 'some-email-12@applozic.com',
      metadata: {
        payload: [
          {
            title: 'Card Title 1',
            subtitle: 'Card Subtitle 1',
            header: {
              overlayText: 'Overlay Text 1',
              imgSrc:
                'https://cdn.shopify.com/s/files/1/0326/7189/t/65/assets/pf-e820b2e0--mother-tree-forest_500x.jpg?v=1619557558'
            },
            description:
              'This is a sample description of the card. It is for sampling purposes.',
            titleExt: 'title extension',
            buttons: [
              {
                name: 'Open Facebook',
                action: {
                  type: 'link',
                  payload: {
                    url: 'https://www.facebook.com'
                  }
                }
              }
            ]
          },
          {
            title: 'Card Title 2',
            subtitle: 'Card Subtitle 2',
            header: {
              overlayText: 'Overlay Text 2',
              imgSrc:
                'https://cdn.shopify.com/s/files/1/0326/7189/t/65/assets/pf-e820b2e0--mother-tree-forest_500x.jpg?v=1619557558'
            },
            description:
              'This is a sample description of the card. It is for sampling purposes.',
            titleExt: 'title extension',
            buttons: [
              {
                name: 'Open Facebook',
                action: {
                  type: 'link',
                  payload: {
                    url: 'https://www.facebook.com'
                  }
                }
              }
            ]
          },
          {
            title: 'Card Title 3',
            subtitle: 'Card Subtitle 3',
            header: {
              overlayText: 'Overlay Text 3',
              imgSrc:
                'https://cdn.shopify.com/s/files/1/0326/7189/t/65/assets/pf-e820b2e0--mother-tree-forest_500x.jpg?v=1619557558'
            },
            description:
              'This is a sample description of the card. It is for sampling purposes.',
            titleExt: 'title extension',
            buttons: [
              {
                name: 'Open Facebook',
                action: {
                  type: 'link',
                  payload: {
                    url: 'https://www.facebook.com'
                  }
                }
              }
            ]
          }
        ]
      }
    });
    console.log('Message key:', sendCards);

    // const messageInfo = await applozicClient.messages.info(
    //   sendMessage.messageKey
    // );
    // console.log('INFO:\n', JSON.stringify(messageInfo, null, 2));

    // const deleteMessageRes = await applozicClient.messages.delete(
    //   '5-null-1628701044019'
    // );
    // console.log('INFO:\n', JSON.stringify(deleteMessageRes, null, 2));

    // const getMessageList = await applozicClient.messages.messageList({
    //   userId: 'abhilash@mkclabs.xyz',
    //   // endTime: 1627820345856,
    //   mainPageSize: 10,
    //   // pageSize: 10,
    //   startIndex: 0
    // });
    // console.log(JSON.stringify(getMessageList, null, 2));
    // const response = await applozicClient.login(
    //   "another-email@applozic.com",
    //   "example-password"
    // );
    // console.log("Auth Token", response.authToken);
    // console.log("Token", response.token);

    // const userDetails = await applozicClient.contacts.userDetails([
    //   "another-email@applozic.com",
    // ]);
    // console.log("userDetails", userDetails);
    // const firstGroupDetails = await applozicClient.groups.createGroup({
    //   groupName: "self member group",
    //   groupMemberList: [response.userId],
    //   admin: response.userId,
    //   type: GroupTypes.OPEN,
    //   metadata: {
    //     CREATE_GROUP_MESSAGE: ":adminName created group :groupName",
    //     REMOVE_MEMBER_MESSAGE: ":adminName removed :userName",
    //     ADD_MEMBER_MESSAGE: ":adminName added :userName",
    //     JOIN_MEMBER_MESSAGE: ":userName joined",
    //     GROUP_NAME_CHANGE_MESSAGE: "Group name changed to :groupName",
    //     GROUP_ICON_CHANGE_MESSAGE: "Group icon changed",
    //     GROUP_LEFT_MESSAGE: ":userName left",
    //     DELETED_GROUP_MESSAGE: ":adminName deleted group",
    //     GROUP_USER_ROLE_UPDATED_MESSAGE: ":userName is :role now",
    //     GROUP_META_DATA_UPDATED_MESSAGE: "",
    //     ALERT: "",
    //     HIDE: "",
    //   },
    // });
    // const secondGroupDetails = await applozicClient.groups.createGroup({
    //   groupName: "second group",
    //   groupMemberList: [],
    //   admin: response.userId,
    //   type: GroupTypes.PRIVATE,
    //   metadata: {
    //     CREATE_GROUP_MESSAGE: ":adminName created group :groupName",
    //     REMOVE_MEMBER_MESSAGE: ":adminName removed :userName",
    //     ADD_MEMBER_MESSAGE: ":adminName added :userName",
    //     JOIN_MEMBER_MESSAGE: ":userName joined",
    //     GROUP_NAME_CHANGE_MESSAGE: "Group name changed to :groupName",
    //     GROUP_ICON_CHANGE_MESSAGE: "Group icon changed",
    //     GROUP_LEFT_MESSAGE: ":userName left",
    //     DELETED_GROUP_MESSAGE: ":adminName deleted group",
    //     GROUP_USER_ROLE_UPDATED_MESSAGE: ":userName is :role now",
    //     GROUP_META_DATA_UPDATED_MESSAGE: "",
    //     ALERT: "",
    //     HIDE: "",
    //   },
    // });
    // console.log({ firstGroupDetails });
    // console.log({ secondGroupDetails });
    // Test groupId: 59394542
    // console.log("groupDetails", groupDetails);
    // const groupInfo = await applozicClient.groups.groupInfo({
    //   groupId: groupDetails.response.clientGroupId,
    // });
    // console.log("groupInfo", groupInfo);
    // const userAdded = await applozicClient.groups.addUserToGroup({
    //   userId: userDetails.response[0].userId,
    //   clientGroupId: groupDetails.response.clientGroupId,
    //   role: UserRoles.MODERATOR,
    // });
    // console.log("userAdded", userAdded);

    // const isUserPresent = await applozicClient.groups.isUserPresent({
    //   userId: userDetails.response[0].userId,
    //   clientGroupId: groupDetails.response.clientGroupId,
    // });
    // console.log("isUserPresent", isUserPresent);
    // const userLeft = await applozicClient.groups.removeUserFromGroup({
    //   userId: userDetails.response[0].userId,
    //   clientGroupId: groupDetails.response.clientGroupId,
    //   resetCount: false,
    // });
    // console.log("userLeft", userLeft);

    // const userLeft = await applozicClient.groups.leaveGroup({
    //   clientGroupId: "59428598",
    //   resetCount: false,
    // });
    // console.log("userLeft", userLeft);
    // const groupDelete = await applozicClient.groups.deleteGroup({
    //   clientGroupId: "59429101",
    // });
    // const groupsDelete = await applozicClient.groups.deleteGroups({
    //   groupIds: [59516655, 59516656],
    // });
    // const openGroups = await applozicClient.groups.openGroup({
    //   pageSize: 20,
    // });
    // console.log("openGroups", openGroups.response.groupPxys);
    // const userCount = await applozicClient.groups.userCount({
    //   clientGroupIds: [openGroups.response.groupPxys[0].clientGroupId],
    // });
    // const groupsDelete = await applozicClient.groups.deleteGroups({
    //   groupIds: [
    //     openGroups.response.groupPxys[0].id,
    //     openGroups.response.groupPxys[1].id,
    //   ],
    // });

    // console.log("groupsDelete", groupsDelete);
    // const addUserToGroup = await applozicClient.groups.addUserToGroup({
    //   clientGroupId: openGroups.response.groupPxys[0].clientGroupId,
    //   userId: userDetails.response[0].userId,
    //   role: UserRoles.MEMBER,
    // });
    // console.log({ addUserToGroup });
    // const removeUserFromGroup = await applozicClient.groups.removeUserFromGroup(
    //   {
    //     clientGroupId: openGroups.response.groupPxys[0].clientGroupId,
    //     userId: userDetails.response[0].userId,
    //   }
    // );
    // console.log({ removeUserFromGroup });

    // const removeUserFromAllGroups = await applozicClient.groups.removeUserFromAllGroups(
    //   { userId: userDetails.response[0].userId }
    // );
    // console.log({ removeUserFromAllGroups });
    // const addUserToGroupAgain = await applozicClient.groups.addUserToGroup({
    //   clientGroupId: openGroups.response.groupPxys[0].clientGroupId,
    //   userId: userDetails.response[0].userId,
    //   role: UserRoles.MEMBER,
    // });
    // const updateUserGroupDetails = await applozicClient.groups.updateUserDetails(
    //   {
    //     clientGroupId: openGroups.response.groupPxys[0].clientGroupId,
    //     notificationAfterTime: 12341234,
    //   }
    // );
    // console.log({ updateUserGroupDetails });
    // const userGroupList = await applozicClient.groups.userGroupList({
    // updatedAt: Date.now(),
    // });
    // console.log({ userGroupList: userGroupList.response[0].type });
    // const createOpenFriendList = await applozicClient.groups.createOpenFriendList(
    //   {
    //     groupName: "open friends",
    //     groupMemberList: [userDetails.response[0].userId, response.userId],
    //   }
    // );
    // console.log({ createOpenFriendList });
    // const createUserFriendList = await applozicClient.groups.createUserFriendList(
    //   {
    //     groupName: "closed friends",
    //     userList: [userDetails.response[0].userId, response.userId],
    //   }
    // );
    // console.log({ createUserFriendList });
    // const getFriendList = await applozicClient.groups.getFriendList({
    //   groupName: "closed friends",
    // });
    // console.log({ getFriendList });

    // const invalidRemoveFromFriendList1 = await applozicClient.groups.removeFromFriendList(
    //   {
    //     groupName: "blasda friends",
    //     userId: userDetails.response[0].userId,
    //   }
    // );
    // console.log({ invalidRemoveFromFriendList1 });
    // const invalidRemoveFromFriendList2 = await applozicClient.groups.removeFromFriendList(
    //   {
    //     groupName: "closed friends",
    //     userId: 'asdzsd2',
    //   }
    // );
    // console.log({ invalidRemoveFromFriendList2 });

    // const validRemoveFromFriendList = await applozicClient.groups.removeFromFriendList(
    //   {
    //     groupName: "closed friends",
    //     userId: userDetails.response[0].userId,
    //     // groupType: GroupTypes.CONTACTS,
    //   }
    // );
    // console.log({ validRemoveFromFriendList });

    // const deleteFriendListClosed = await applozicClient.groups.deleteFriendList(
    //   {
    //     groupName: "closed friends",
    //   }
    // );
    // console.log({ deleteFriendListClosed });

    // const deleteOpenFriendList = await applozicClient.groups.deleteFriendList({
    //   groupName: "open friends",
    //   groupType: GroupTypes.CONTACTS,
    // });
    // console.log({ deleteOpenFriendList });
    // const conversation = await applozicClient.topics.retrieveConversation({
    //   topicId: "newest user topic",
    //   topicDetail: { title: "group title" },
    //   userId: userDetails.response[0].userId,
    // });
    // console.log({ conversation: conversation.response });
    // const sendMessageToTopic = await applozicClient.topics.sendMessageToUser({
    //   conversationId: conversation.response.conversationPxy.id,
    //   message: "Hey there",
    //   to: userDetails.response[0].userId,
    // });
    // console.log({ sendMessageToTopic });

    // // TODO: Not working
    // const closeTopic = await applozicClient.topics.closeTopic({
    //   topicId: "newest user topic",
    //   withUserId: userDetails.response[0].userId,
    // });
    // console.log({ closeTopic });
  } catch (error) {
    // console.log(error);
  }
};

main();
