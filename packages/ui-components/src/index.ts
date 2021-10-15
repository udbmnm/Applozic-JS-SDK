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
  // Chat Components
  ChatDetails,
  FeatureTabs,
  ChatPanel,
  SendMessage,
  // Chat Components Wired
  LoginPage,
  FeatureTabsWired,
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
  // Chat component Properties
  SendMessageProps,
  ChatDetailProps,
  ChatTabHeadStripProps,
  FeatureTabsProps,
  ChatPanelProps,
  LoginPageProps,
  // Full View props
  FullViewWithoutBaseProps,
  FullViewProps,
};
