import React, { forwardRef, useState, useEffect } from "react";
import { MotionListItemProps } from "../MotionListItem/MotionListItem";
import MotionListItem from "../MotionListItem";
import { ChatType, Message } from "../../models/chat";
import DocDownloadItem, { VARIANTS } from "../DocDownloadItem";
import { MessageContentType } from "@applozic/core-sdk";
import {
  HStack,
  Text,
  Image,
  useColorModeValue as mode,
  Avatar,
  VStack,
  Link,
  Box,
  Spacer,
} from "@chakra-ui/react";
import Linkify from "react-linkify";
import Icon from "../Icon";
import MessageStatusIcon from "../Icon/MessageStatusIcon";
import ReactWaves from "@dschoon/react-waves";
import { getFileBlobFromUrl } from "../../utils/file";
import ChevronHover from "../ChevronHover";
import {
  getReadableHours,
  getReadableMinutes,
  getAmPm,
} from "../../time-utils";

const downloadFileFromUrl = (url: string, filename: string) => {
  console.log({ url, filename });
  const tempLink = document.createElement("a");
  tempLink.href = url;
  tempLink.setAttribute("download", filename);
  tempLink.click();
};

export interface ChatBubbleProps extends MotionListItemProps {
  showTime?: boolean;
  message: Message;
  showUserInfo?: boolean;
  userName?: string;
  userImage?: string;
  chatType: ChatType;
  gMapsApiKey?: string;
  onMessageDelete?: (deleteForAll?: boolean) => void;
}

const ChatBubble = forwardRef<any, ChatBubbleProps>(
  (
    {
      showTime,
      message,
      showUserInfo,
      userName,
      userImage,
      chatType,
      gMapsApiKey,
      onMessageDelete,
    },
    ref
  ) => {
    const [hovered, setHovered] = useState(false);
    const [file, setFile] = useState<File>();
    const [playAudio, setPlayAudio] = useState(false);
    const [fileUrl] = useState(
      "https://applozic.appspot.com/rest/ws/aws/file/" +
        message.file?.blobKey ?? ""
    );

    const onFileClick = () => {
      if (message.file) {
        downloadFileFromUrl(fileUrl, message.file.name);
      }
    };

    useEffect(() => {
      getFileBlobFromUrl(fileUrl).then(setFile);
    }, []);

    const location = { lat: 0, lon: 0 };
    let isLocationParsed = false;
    if (message.contentType === MessageContentType.LOCATION) {
      try {
        const locationObject = JSON.parse(message.messageText) as {
          lat: number;
          lon: number;
        };
        if (locationObject.lat && locationObject.lon) {
          location.lat = locationObject.lat;
          location.lon = locationObject.lon;
          isLocationParsed = true;
        }
      } catch (e) {
        isLocationParsed = false;
      }
    }

    const isActionMessage = !!message?.metadata?.action;

    const chevronItems = [
      {
        label: "Delete message",
        onClick: () => onMessageDelete && onMessageDelete(),
      },
    ];

    if (chatType == ChatType.GROUP) {
      chevronItems.push({
        label: "Delete message for all",
        onClick: () => onMessageDelete && onMessageDelete(true),
      });
    }

    const TimeStampItem = () => {
      return (
        <Box>
          <Text fontSize="12px" color="textMain.300">
            {getReadableHours(message.timeStamp)}:
            {getReadableMinutes(message.timeStamp)} {getAmPm(message.timeStamp)}
          </Text>
        </Box>
      );
    };

    return (
      <HStack
        ref={ref}
        as="li"
        alignSelf={
          isActionMessage
            ? "center"
            : message.isReply
            ? "flex-end"
            : "flex-start"
        }
        spacing={2}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {showUserInfo && (
          <MotionListItem
            key={message.key}
            initial={false}
            layout
            listStyleType="none"
            userSelect="none"
          >
            <Avatar size="md" name={userName ?? ""} src={userImage} />
          </MotionListItem>
        )}
        {message.isReply && !isActionMessage && (showTime || hovered) && (
          <TimeStampItem />
        )}
        <MotionListItem
          key={message.key}
          initial={false}
          layout
          listStyleType="none"
          userSelect="none"
          bg={
            isActionMessage
              ? "#F2F0F5"
              : message.isReply
              ? "primary.500"
              : mode("#F2F0F5", "#2E2D32")
          }
          borderRadius="md"
          p={2}
          display="inline-flex"
          width={message.file ? "290px" : "auto"}
        >
          <VStack spacing={1} alignItems="flex-start" width="full">
            {showUserInfo && (
              <Text color="textLight.500">{userName ?? ""}</Text>
            )}
            {message.file?.thumbnailUrl && (
              <Image
                src={message.file.thumbnailUrl}
                width="280px"
                onClick={onFileClick}
                cursor="pointer"
              />
            )}
            {message.contentType === MessageContentType.LOCATION &&
              isLocationParsed && (
                <Link
                  href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {gMapsApiKey ? (
                    <Image
                      src={`https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lon}&zoom=12&size=200x100&key=${gMapsApiKey}&markers=${location.lat},${location.lon}`}
                      width="200px"
                      height="100px"
                      cursor="pointer"
                      onload={() => {}}
                    />
                  ) : (
                    <Text>
                      Please provide a Google Maps API key for preview
                    </Text>
                  )}
                </Link>
              )}
            {!message.file?.thumbnailUrl && message.file?.blobKey && (
              <Box width="full">
                {message.file &&
                message.file.contentType.indexOf("audio/") >= 0 ? (
                  <HStack width="100%" height="25px">
                    {/* <audio
                      src={URL.createObjectURL(file)}
                      controls
                      // style={{ display: 'none' }}
                    /> */}
                    <Icon
                      icon={"play"}
                      size={16}
                      style={{ opacity: 0.6 }}
                      color={
                        isActionMessage
                          ? "textMain.300"
                          : message.isReply
                          ? "white"
                          : "textMain.700"
                      }
                      cursor="pointer"
                      onClick={() => setPlayAudio(!playAudio)}
                    />
                    <Box marginLeft="-80px" width="200px">
                      <ReactWaves
                        audioFile={fileUrl}
                        style={{ padding: "0", width: "100%" }}
                        options={{
                          barHeight: 28,
                          cursorWidth: 0,
                          height: 30,
                          hideScrollbar: true,
                          progressColor: "#bbb",
                          responsive: true,
                          waveColor: message.isReply ? "white" : "#09021A",
                          barWidth: 1,
                        }}
                        volume={1}
                        zoom={1}
                        playing={playAudio}
                      />
                    </Box>
                    <Spacer />
                    <Icon
                      icon={"download"}
                      size={16}
                      style={{ opacity: 0.6 }}
                      color={
                        isActionMessage
                          ? "textMain.300"
                          : message.isReply
                          ? "white"
                          : "textMain.700"
                      }
                      cursor="pointer"
                      onClick={onFileClick}
                    />
                  </HStack>
                ) : (
                  <Box onClick={onFileClick} cursor="pointer">
                    <DocDownloadItem
                      doc={message.file}
                      variant={
                        message.isReply ? VARIANTS.ACCENTED : VARIANTS.DEFAULT
                      }
                      width={275}
                    />
                  </Box>
                )}
              </Box>
            )}

            <HStack spacing={2} alignItems="flex-end" width="full">
              {message.contentType !== MessageContentType.LOCATION && (
                <Text
                  color={
                    isActionMessage
                      ? "textMain.300"
                      : message.isReply
                      ? "white"
                      : "textMain.700"
                  }
                  fontSize={isActionMessage ? "11px" : "14px"}
                  fontWeight="400"
                >
                  <Linkify
                    componentDecorator={(decoratedHref, decoratedText, key) => {
                      if (!isActionMessage) {
                        return (
                          <Link
                            target="blank"
                            rel="noopener noreferrer"
                            href={decoratedHref}
                            key={key}
                            color={
                              message.isReply ? "textMain.700" : "accent.700"
                            }
                          >
                            {decoratedText}
                          </Link>
                        );
                      } else {
                        return <>{decoratedText}</>;
                      }
                    }}
                  >
                    {message.messageText}
                  </Linkify>
                </Text>
              )}
              <Spacer />
              {!isActionMessage && message.isReply && message?.status && (
                <MessageStatusIcon status={message.status} />
              )}
              {!isActionMessage && !message.isReply && (
                <ChevronHover hovered={hovered} items={chevronItems} />
              )}
              {!isActionMessage && message.isReply && hovered && (
                <ChevronHover
                  hovered={hovered}
                  color="white"
                  items={chevronItems}
                />
              )}
            </HStack>
          </VStack>
        </MotionListItem>
        {!message.isReply && !isActionMessage && (showTime || hovered) && (
          <TimeStampItem />
        )}
      </HStack>
    );
  }
);

export default ChatBubble;
