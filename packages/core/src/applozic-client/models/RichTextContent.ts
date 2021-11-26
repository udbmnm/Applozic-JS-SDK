export enum MessageMetaDataTemplateType {
  BUTTON = '3',
  IMAGE_CAPTION = '9',
  LIST = '7',
  CARD = '10'
}

export interface RichTextContent<T> {
  formData?: { [key: string]: string };
  formAction?: string;
  requestType?: 'json';
  payload: T;
}

export interface RichTextMetaData {
  template: MessageMetaDataTemplateType;
  contentType: string;
  payload: string;
  formData: string;
  formAction?: string;
  requestType?: 'json';
}

export interface LinkButton {
  type: 'link';
  url: string;
  name: string;
}

export interface SubmitButton {
  name: string;
  replyText: string;
}

export interface SuggestedResponseButton {
  title: string;
  message: string;
}

export type Button = LinkButton | SubmitButton | SuggestedResponseButton;

export type ButtonRichTextMetaData = RichTextContent<Button[]>;

export interface ImageWithCaption {
  caption: string;
  url: string;
}

export type ImageWithCaptionRichTextMetaData = RichTextContent<
  ImageWithCaption[]
>;

export interface ListLinkAction {
  type: 'link';
  url: string;
}

export interface ListQuickReplyAction {
  type: 'quick_reply';
  text: string;
}

export interface ListElement {
  imgSrc: string;
  title: string;
  description: string;
  action: ListLinkAction | ListQuickReplyAction;
}

export interface List {
  headerImgSrc: string;
  headerText: string;
  elements: ListElement[];
  buttons: { name: string; action: ListLinkAction | ListQuickReplyAction }[];
}

export type ListRichTextMetaData = RichTextContent<List>;

export interface CardQuickReplyAction {
  type: 'quickReply';
  payload: {
    title: string;
    message: string;
  };
}

export interface CardLinkAction {
  type: 'link';
  payload: {
    url: string;
  };
}

export interface CardSubmitAction {
  type: 'submit';
  payload: {
    text: string;
    formData: { [key: string]: string };
    formAction: string;
    requestType?: 'json';
  };
}

export interface Card {
  title: string;
  subtitle: string;
  header: {
    overlayText: string;
    imgSrc: string;
  };
  description: string;
  titleExt: string;
  buttons: {
    name: string;
    action: CardQuickReplyAction | CardLinkAction | CardSubmitAction;
  }[];
}

export type CardsRichTextMetaData = RichTextContent<Card[]>;

export function getMetaDataFromRichTextContent<T>(
  template: MessageMetaDataTemplateType,
  { payload, formData, formAction, requestType }: RichTextContent<T>
): RichTextMetaData {
  return {
    template,
    contentType: '300',
    payload: JSON.stringify(payload),
    formData: JSON.stringify(formData),
    formAction,
    requestType
  };
}

export function getRichTextContentFromMetaData<T>({
  payload,
  formData,
  formAction,
  requestType
}: RichTextMetaData): RichTextContent<T> {
  return {
    payload: JSON.parse(payload) as T,
    formData: formData
      ? (JSON.parse(formData) as { [key: string]: string })
      : undefined,
    formAction,
    requestType
  };
}
