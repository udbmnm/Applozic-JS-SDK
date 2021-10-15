import "@fontsource/roboto";
import "focus-visible/dist/focus-visible";

import { ChatType, Message, MessageStatus, RecentChat } from "./models/chat";
import FullView, {
  FullViewProps,
  FullViewWithoutBase,
  FullViewWithoutBaseProps,
} from "./views/FullView";

import FeatureTab from "./models/Feature";
import Button from "./components/Button";
import { ButtonProps } from "./components/Button/Button";
import Icon from "./components/Icon";
import { IconProps } from "./components/Icon/Icon";
import Input from "./components/Input";
import { InputProps } from "./components/Input/Input";
import ProvideBase from "./providers/useBase";
import MapPicker, { MapPickerProps } from "./components/MapPicker";
import MapPickerPopup, {
  MapPickerPopupProps,
} from "./components/MapPickerPopup";
import SendMessage, { SendMessageProps } from "./components/SendMessage";
import { ChatDetails, ChatDetailProps } from "./components/ChatDetails";
import { ChatTabHeadStripProps } from "./components/ChatTabHeadStrip";
import FeatureTabs, { FeatureTabsProps } from "./components/FeatureTabs";
import { ProvideApplozicClient } from "./providers/useApplozicClient";
import ChatDetailsWired from "./components/ChatDetails/ChatDetailsWired";
import ChatPanel, {
  ChatPanelProps,
  ChatPanelWired,
} from "./components/ChatPanel";
import FeatureTabsWired from "./components/FeatureTabs/FeatureTabsWired";
import ActiveChat from "./models/chat/ActiveChat";
import LoginPage, { LoginPageProps } from "./components/LoginPage";
import ChatWindow, { ChatWindowProps } from "./components/ChatWindow";
import ChatBubble, {
  ChatBubbleProps,
} from "./components/ChatWindow/ChatBubble";
import ChevronHover from "./components/ChevronHover";
import { ChevronHoverProps } from "./components/ChevronHover/ChevronHover";
import LoginForm from "./components/LoginForm";
import LoginFormWired from "./components/LoginForm/LoginFormWired";
import { LoginFormProps } from "./components/LoginForm/LoginForm";
import ChatDetailsMeta, {
  ChatDetailsMetaProps,
} from "./components/ChatDetails/ChatDetailsMeta";
import PictureAndName, {
  PictureAndNameProps,
} from "./components/ChatDetails/PictureAndName";
import PrivacyAndSupport, {
  PrivacyAndSupportProps,
} from "./components/ChatDetails/PrivacyAndSupport";
import Form from "./components/Form";
import { FormProps } from "./components/Form/Form";
import { Sidebar } from "./components/Sidebar";
import { SidebarProps } from "./components/Sidebar/Sidebar";
import SidebarWired from "./components/Sidebar/SidebarWired";

export {
  // ENUMs
  MessageStatus,
  FeatureTab,
  ChatType,
  // Providers
  ProvideBase,
  ProvideApplozicClient,
  // Core components
  Button,
  Icon,
  Input,
  MapPicker,
  MapPickerPopup,
  ChevronHover,
  Form,
  // Chat Components
  ChatBubble,
  ChatWindow,
  ChatDetails,
  ChatDetailsMeta,
  PictureAndName,
  PrivacyAndSupport,
  FeatureTabs,
  Sidebar,
  ChatPanel,
  SendMessage,
  LoginForm,
  // Chat Components Wired
  LoginFormWired,
  LoginPage,
  FeatureTabsWired,
  SidebarWired,
  ChatPanelWired,
  ChatDetailsWired,
  // Component to be used in storybook
  FullViewWithoutBase,
  // Final component to be used by developer
  FullView,
};

export type {
  // Models
  Message,
  ActiveChat,
  RecentChat,
  // Core component Properties
  ButtonProps,
  IconProps,
  InputProps,
  MapPickerProps,
  MapPickerPopupProps,
  ChevronHoverProps,
  FormProps,
  // Chat component Properties
  LoginFormProps,
  LoginPageProps,
  FeatureTabsProps,
  SidebarProps,
  ChatBubbleProps,
  ChatWindowProps,
  SendMessageProps,
  ChatTabHeadStripProps,
  ChatPanelProps,
  ChatDetailsMetaProps,
  PrivacyAndSupportProps,
  PictureAndNameProps,
  ChatDetailProps,
  // Full View props
  FullViewWithoutBaseProps,
  FullViewProps,
};
