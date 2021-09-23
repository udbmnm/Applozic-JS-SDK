import React, { useEffect, useState } from "react";
import {
  Center,
  VStack,
  Box,
  Flex,
  Spacer,
  Text,
  Divider,
  useColorModeValue as mode,
  Checkbox,
} from "@chakra-ui/react";
import ChatDetailsMeta, { ChatDetailsMetaProps } from "./ChatDetailsMeta";
import SharedMedia from "../SharedMedia";
import { CloseLight } from "../../icons/Close";
import PictureAndName from "./PictureAndName";
import PrivacyAndSupport from "./PrivacyAndSupport";
import MotionBox from "../MotionBox";
import { Message } from "../../models/chat";
import { IUpdateGroupDetailsRequest, Group, User } from "@applozic/core-sdk";
import { ChatType } from "../../models/chat";
import ScrollArea from "../ScrollArea";
import GroupMembers from "./GroupMembers";
import { AnimatePresence } from "framer-motion";
import AddMembers from "./GroupMembers/AddMembers";
import { useQueryClient } from "react-query";
import { ModifyGroupMembers } from "../../hooks/mutations/useUpdateGroupMembers";
import GroupOptions from "./GroupOptions";
import { ISharedMedia } from "../SharedMedia/SharedMedia";

export interface ChatDetailProps {
  type: ChatType;
  sharedMedia: ISharedMedia | undefined;
  name: string;
  imageUrl: string;

  onCloseClicked: () => void | Promise<void>;
  onChatClearClicked: () => void | Promise<void>;
  onBlockClicked: () => void | Promise<void>;
  // onReportClicked: () => void | Promise<void>;
  // onNotificationToggle: (value: boolean) => void | Promise<void>;

  isBlocked?: boolean;
  metaProps?: ChatDetailsMetaProps;
  group?: Group;
  userContacts?: User[];
  updateMemberList?: (
    userIds: string[],
    onSuccess:
      | ((
          data: string | undefined,
          variables: ModifyGroupMembers,
          context: unknown
        ) => void | Promise<unknown>)
      | undefined
  ) => void | Promise<void>;

  updateGroupInfo: (
    options: IUpdateGroupDetailsRequest,
    onSuccess?:
      | ((
          data: string | undefined,
          variables: IUpdateGroupDetailsRequest,
          context: unknown
        ) => void | Promise<unknown>)
      | undefined
  ) => void | Promise<void>;
  isAdmin: boolean;
  onLeaveGroupClicked: () => void;
  onDeleteGroupClicked: () => void;
  onFileClick: (url: string, filename: string) => void;
}

const ChatDetails = ({
  type,
  group,
  userContacts,
  sharedMedia,
  name,
  imageUrl,
  isBlocked,
  metaProps,
  updateMemberList,
  updateGroupInfo,
  onCloseClicked,
  onChatClearClicked,
  onBlockClicked,
  onLeaveGroupClicked,
  onDeleteGroupClicked,
  isAdmin,
  onFileClick,
}: ChatDetailProps) => {
  const queryClient = useQueryClient();
  const onClose = () => {
    if (onCloseClicked) {
      onCloseClicked();
    }
  };
  const onChatClear = () => {
    if (onChatClearClicked) {
      onChatClearClicked();
    }
  };

  const onBlock = () => {
    if (onBlockClicked) {
      onBlockClicked();
    }
  };

  const onUpdateMembers = (userIds: string[]) => {
    if (updateMemberList) {
      updateMemberList(userIds, (data, variables) => setaddMembers(false));
    }
  };

  const onUpdateGroupInfo = (groupInfo: IUpdateGroupDetailsRequest) => {
    if (updateGroupInfo) {
      updateGroupInfo(groupInfo);
    }
  };

  const onLeaveGroup = () => {
    if (onLeaveGroupClicked) {
      onLeaveGroupClicked();
    }
  };
  const onDeleteGroup = () => {
    if (onDeleteGroupClicked) {
      onDeleteGroupClicked();
    }
  };
  const [addMembers, setaddMembers] = useState(false);
  const [sharedMediaFullScreen, setSharedMediaFullScreen] = useState(false);

  return (
    <MotionBox
      height="full"
      padding={0}
      width="350px"
      exit={{ x: "101%" }}
      transition={{
        type: "tween",
      }}
      ml={2}
      animate={{ x: 0 }}
      initial={{ x: "101%" }}
      borderRadius={15}
      borderWidth={mode(1, 0)}
      borderColor="#E9E9E9"
      backgroundColor={mode("#FFFFFF", "#272528")}
    >
      <AnimatePresence>
        {sharedMediaFullScreen && (
          <MotionBox
            zIndex={2}
            width={"100%"}
            height="100%"
            initial={{ y: "101%" }}
            transition={{ type: "tween" }}
            animate={{ y: 0 }}
            exit={{ y: "101%" }}
          >
            <SharedMedia
              photosProps={sharedMedia?.photosProps}
              docsProps={sharedMedia?.docsProps}
              isFullView={sharedMediaFullScreen}
              toggleFullView={() => setSharedMediaFullScreen(false)}
            />
          </MotionBox>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {addMembers && (
          <MotionBox
            zIndex={2}
            width={"100%"}
            height="100%"
            initial={{ y: "101%" }}
            transition={{ type: "tween" }}
            animate={{ y: 0 }}
            exit={{ y: "101%" }}
          >
            <AddMembers
              onClickCloseAddMembers={() => setaddMembers(false)}
              userContacts={userContacts}
              currentMembers={group?.memberUserKeys}
              updateMemberList={(userIds) => onUpdateMembers(userIds)}
            />
          </MotionBox>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!addMembers && !sharedMediaFullScreen && (
          <ScrollArea padding={5} width={"full"}>
            <VStack>
              <Flex width="100%">
                <Spacer />
                <Box onClick={onClose}>
                  <CloseLight />
                </Box>
              </Flex>

              <Box style={{ marginTop: "38px" }}>
                <PictureAndName
                  photoKey={"imageUrl"}
                  nameKey={"newName"}
                  photoUrl={imageUrl}
                  name={name}
                  isBlocked={isBlocked}
                  isEditable={isAdmin}
                  onUpdateValue={(key, value) =>
                    onUpdateGroupInfo({ [key]: value })
                  }
                />
              </Box>

              <Divider color="#e9e9e9" style={{ marginTop: "20px" }} />

              {metaProps && (
                <>
                  <Box width="100%" style={{ marginTop: "30px" }}>
                    <ChatDetailsMeta
                      items={metaProps?.items ? metaProps.items : []}
                    />
                  </Box>
                  <Divider color="#e9e9e9" style={{ marginTop: "20px" }} />
                </>
              )}

              {sharedMedia && (
                <>
                  <Box width="100%" style={{ marginTop: "20px" }}>
                    <SharedMedia
                      photosProps={sharedMedia?.photosProps}
                      docsProps={sharedMedia?.docsProps}
                      isFullView={false}
                      toggleFullView={() => setSharedMediaFullScreen(true)}
                    />
                  </Box>
                  <Divider color="#e9e9e9" style={{ marginTop: "20px" }} />
                </>
              )}
              {type == ChatType.GROUP && (
                <Box width="100%" style={{ marginTop: "20px" }}>
                  <GroupMembers
                    adminId={group?.adminId as string}
                    members={group?.groupUsers?.map((u) => {
                      const user = queryClient.getQueryData<User>([
                        "user",
                        u.userId,
                        true,
                      ]);
                      return user as User;
                    })}
                    numberOfMembers={group?.userCount}
                    addNewMember={() => setaddMembers(true)}
                  />
                </Box>
              )}
              <Box width="100%" style={{ marginTop: "20px" }}>
                {type === ChatType.USER ? (
                  <PrivacyAndSupport
                    onChatClear={onChatClear}
                    onBlockUser={onBlock}
                  />
                ) : (
                  <GroupOptions
                    onLeaveGroup={onLeaveGroup}
                    onDeleteGroup={onDeleteGroup}
                    isAdmin={isAdmin}
                  />
                )}
              </Box>
            </VStack>
          </ScrollArea>
        )}
      </AnimatePresence>
    </MotionBox>
  );
};

export default ChatDetails;
