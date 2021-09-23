import "@fontsource/roboto";

// Components
import { default as Button } from "./components/Button";
import { default as EmojiPicker } from "./components/EmojiPicker";
import { default as EmojiPopup } from "./components/EmojiPicker";
import { default as Input } from "./components/Input";
import { default as Form } from "./components/Form";
import { default as LoginForm } from "./components/LoginForm";
import { default as SendMessage } from "./components/SendMessage";
import { default as ScrollArea } from "./components/ScrollArea";
import { default as ChatWindow } from "./components/ChatWindow";
import { default as ChatDetails } from "./components/ChatDetails";
import ChatStatusBar from "./components/ChatStatusBar";
import ChatTabHeadStrip from "./components/ChatTabHeadStrip";
import type { ChatTabHeadStripProps } from "./components/ChatTabHeadStrip";
import { default as ContactListPane } from "./components/Sidebar/RecentChatsSidebar";
import type { IRecentChats } from "./components/Sidebar/RecentChatsSidebar";
import { Message, MessageStatus } from "./models/chat";
import { default as FullViewWithoutSource } from "./views/FullView";
import withWires from "./utils/withWires";
import Icon from "./components/Icon";
import { useColorMode } from "@chakra-ui/react";
import withSource from "./utils/withSource";

const FullView = withSource(FullViewWithoutSource);

export {
  Button,
  EmojiPicker,
  EmojiPopup,
  Form,
  LoginForm,
  Input,
  SendMessage,
  ScrollArea,
  ChatWindow,
  ChatDetails,
  ChatStatusBar,
  ChatTabHeadStrip,
  ContactListPane,
  FullView,
  MessageStatus,
  Icon,
  withWires,
  useColorMode,
};

// Models
export type { Message, IRecentChats, ChatTabHeadStripProps };
