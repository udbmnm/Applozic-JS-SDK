import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  HStack,
  IconButton,
  useEditableControls,
} from "@chakra-ui/react";
import React from "react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

export function EditableText({
  defaultValue,
  onSubmit,
  disabled,
}: {
  defaultValue?: string;
  onSubmit: ((nextValue: string) => void) | undefined;
  disabled?: boolean;
}) {
  /* Here's a custom control */
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          aria-label="submit"
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label="close"
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          aria-label="edit"
          size="sm"
          icon={<EditIcon />}
          {...getEditButtonProps()}
        />
      </Flex>
    );
  }

  return (
    <Editable
      isDisabled={disabled}
      textAlign="center"
      defaultValue={defaultValue}
      isPreviewFocusable={false}
      onSubmit={onSubmit}
      fontSize="16px"
      fontWeight="400"
    >
      <HStack>
        <EditablePreview />
        <EditableInput />
        {!disabled && <EditableControls />}
      </HStack>
    </Editable>
  );
}
