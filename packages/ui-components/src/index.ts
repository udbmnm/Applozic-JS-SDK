import '@fontsource/roboto';
import 'focus-visible/dist/focus-visible';
import Button from './components/Button';
import { ButtonProps } from './components/Button/Button';
import { ChatDetailProps, ChatDetails } from './components/ChatDetails';
import ChatDetailsMeta, {
  ChatDetailsMetaProps
} from './components/ChatDetails/ChatDetailsMeta';
import ChatDetailsWired from './components/ChatDetails/ChatDetailsWired';
import PictureAndName, {
  PictureAndNameProps
} from './components/ChatDetails/PictureAndName';
import PrivacyAndSupport, {
  PrivacyAndSupportProps
} from './components/ChatDetails/PrivacyAndSupport';
import ChatPanel, {
  ChatPanelProps,
  ChatPanelWired
} from './components/ChatPanel';
import ChatStatusBar, {
  ChatStatusBarProps
} from './components/ChatStatusBar/ChatStatusBar';
import { ChatTabHeadStripProps } from './components/ChatTabHeadStrip';
import ChatWindow, { ChatWindowProps } from './components/ChatWindow';
import ChatBubble, {
  ChatBubbleProps
} from './components/ChatWindow/ChatBubble';
import ChevronHover from './components/ChevronHover';
import { ChevronHoverProps } from './components/ChevronHover/ChevronHover';
import EmojiPicker, {
  BOTTOM_CATEGORIES,
  EmojiPickerProps
} from './components/EmojiPicker/EmojiPicker';
import { EMOJI_CATEGORY } from './components/EmojiPicker/SmileyCategoryStrip';
import EmojiPopup, {
  EmojiPopupProps
} from './components/EmojiPopup/EmojiPopup';
import FeatureTabs, { FeatureTabsProps } from './components/FeatureTabs';
import FeatureTabsWired from './components/FeatureTabs/FeatureTabsWired';
import Form from './components/Form';
import { FormProps } from './components/Form/Form';
import Icon from './components/Icon';
import { IconProps } from './components/Icon/Icon';
import Input from './components/Input';
import { InputProps } from './components/Input/Input';
import LoginForm from './components/LoginForm';
import { LoginFormProps } from './components/LoginForm/LoginForm';
import LoginFormWired from './components/LoginForm/LoginFormWired';
import LoginPage, { LoginPageProps } from './components/LoginPage';
import MapPicker, { MapPickerProps } from './components/MapPicker';
import MapPickerPopup, {
  MapPickerPopupProps
} from './components/MapPickerPopup';
import SendMessage, { SendMessageProps } from './components/SendMessage';
import { Sidebar } from './components/Sidebar';
import { SidebarProps } from './components/Sidebar/Sidebar';
import SidebarWired from './components/Sidebar/SidebarWired';
import { ChatType, Message, MessageStatus, RecentChat } from './models/chat';
import ActiveChat from './models/chat/ActiveChat';
import FeatureTab from './models/Feature';
import { ProvideApplozicClient } from './providers/useApplozicClient';
import ProvideBase from './providers/useBase';
import FullView, {
  FullViewProps,
  FullViewWithoutBase,
  FullViewWithoutBaseProps
} from './views/FullView';

export {
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
  EmojiPicker,
  EmojiPopup,
  BOTTOM_CATEGORIES,
  EMOJI_CATEGORY,
  MapPicker,
  MapPickerPopup,
  ChevronHover,
  Form,
  // Chat Components
  ChatBubble,
  ChatWindow,
  ChatDetails,
  ChatStatusBar,
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
  FullView
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
  EmojiPickerProps,
  EmojiPopupProps,
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
  ChatStatusBarProps,
  SendMessageProps,
  ChatTabHeadStripProps,
  ChatPanelProps,
  ChatDetailsMetaProps,
  PrivacyAndSupportProps,
  PictureAndNameProps,
  ChatDetailProps,
  // Full View props
  FullViewWithoutBaseProps,
  FullViewProps
};
